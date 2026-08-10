import dgram from "node:dgram";

// 矢張市の天気機能はサーバーのシステム時計をそのまま信用しており、コンテナの時計が
// ずれていると日付境界(0時)や21時の的中率発表判定もずれてしまう。NICT(情報通信研究機構)が
// 公開しているNTPサーバー ntp.nict.jp に問い合わせて補正した「今」を提供する。
// ※ ブラウザはUDPソケットを扱えないため、この補正はサーバーサイドのみで有効。
// クライアント側(WeatherBadge)は引き続きブラウザのローカル時計を使用する。

const NTP_HOST = "ntp.nict.jp";
const NTP_PORT = 123;
const NTP_EPOCH_OFFSET_SECONDS = 2208988800; // 1900-01-01 -> 1970-01-01
const SYNC_INTERVAL_MS = 30 * 60 * 1000; // 30分ごとに再同期
const QUERY_TIMEOUT_MS = 2000;

let cachedOffsetMs = 0;
let lastSyncAt = 0;
let syncInFlight: Promise<void> | null = null;

/** ntp.nict.jpへSNTPリクエストを1回送り、応答からUnixミリ秒(サーバー送信時刻)を求める。 */
function queryNtpOnce(): Promise<number> {
  return new Promise((resolve, reject) => {
    const socket = dgram.createSocket("udp4");
    // NTPv3クライアントリクエスト: LI=0, VN=3, Mode=3(client)、残り47バイトは0埋め。
    const packet = Buffer.alloc(48);
    packet[0] = 0x1b;
    // error/message/timeout/send-callbackは互いに独立したイベントで、複数が同時に
    // 発火しうる(例: DNS失敗がerrorイベントとsendコールバックの両方に届く)。
    // このフラグでどれか1つだけを採用し、socket.close()の二重呼び出しや
    // 一度解決した後の重複resolve/rejectを防ぐ。
    let settled = false;

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      socket.close();
      reject(new Error("ntp.nict.jp: request timed out"));
    }, QUERY_TIMEOUT_MS);

    socket.once("error", (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      socket.close();
      reject(err);
    });

    socket.once("message", (msg) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      socket.close();
      try {
        // 想定外に短い(壊れた)応答だとreadUInt32BEが例外を投げる。ここでcatchせずに
        // 投げっぱなしにすると、このコールバック内の例外はPromiseのreject/resolveに
        // 変換されずqueryNtpOnce()が永久にpendingのままになり、結果としてrefreshOffset()の
        // awaitも完了せずsyncInFlightが永久にnullへ戻らない(=以後同期が二度と走らない)
        // というバグになるため、必ずreject()で終わらせる。
        if (msg.length < 48) {
          throw new Error(`ntp.nict.jp: unexpected response length (${msg.length} bytes)`);
        }
        // Transmit Timestamp(バイト40-47): 32bit秒 + 32bit小数部
        const seconds = msg.readUInt32BE(40);
        const fraction = msg.readUInt32BE(44);
        const unixMs = (seconds - NTP_EPOCH_OFFSET_SECONDS) * 1000 + (fraction / 4294967296) * 1000;
        resolve(unixMs);
      } catch (err) {
        reject(err);
      }
    });

    socket.send(packet, NTP_PORT, NTP_HOST, (err) => {
      if (err && !settled) {
        settled = true;
        clearTimeout(timer);
        socket.close();
        reject(err);
      }
    });
  });
}

/** キャッシュ済みオフセットを更新する。失敗しても例外は投げず、既存の値(初期値0=ローカル時計)を維持する。 */
async function refreshOffset(): Promise<void> {
  // 成否に関わらず先に更新しておく。失敗時にここを更新しないと、次回呼び出し時も
  // 「前回同期からSYNC_INTERVAL_MS以上経過している」と判定され続け、ntp.nict.jpに
  // 到達できない環境ではリクエストのたびに再同期を試みてしまう(想定していた
  // 「一定間隔でのバックグラウンド同期」から外れ、無駄なソケット生成が続く)。
  lastSyncAt = Date.now();
  try {
    const requestSentAt = Date.now();
    const ntpUnixMs = await queryNtpOnce();
    const roundTripMs = Date.now() - requestSentAt;
    // 往復遅延の半分を足し、応答受信時点でのサーバー時刻を簡易推定する。
    cachedOffsetMs = ntpUnixMs + roundTripMs / 2 - Date.now();
  } catch {
    // k8sクラスタのネットワークポリシーでUDP egressが塞がれている場合など、
    // ntp.nict.jpに到達できない環境でも機能を止めないよう、ここでは何もしない
    // (cachedOffsetMsは直前の値のまま。次回の間隔経過後にまた再同期を試みる)。
  }
}

/**
 * ntp.nict.jpで補正した「今」を返す。同期は一定間隔でバックグラウンド実行され、
 * 呼び出し自体を待たせることはない(未同期・同期失敗時はローカル時計をそのまま返す)。
 */
export function getNtpCorrectedNow(): Date {
  const now = Date.now();
  if (now - lastSyncAt > SYNC_INTERVAL_MS && !syncInFlight) {
    syncInFlight = refreshOffset().finally(() => {
      syncInFlight = null;
    });
  }
  return new Date(now + cachedOffsetMs);
}
