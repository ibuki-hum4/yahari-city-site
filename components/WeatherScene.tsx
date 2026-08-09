"use client";

import { Flower2 } from "lucide-react";
import { motion } from "motion/react";
import type { WeatherType } from "@/lib/weather";

type GrassIntensity = "calm" | "breezy" | "violent";
type RainIntensity = "none" | "light" | "heavy";
type SnowGround = "none" | "partial" | "full";

interface SceneParams {
  sky: string; // Tailwindのグラデーション色クラス(from-*/to-*)
  grass: GrassIntensity;
  rain: RainIntensity;
  lightning: boolean;
  snowGround: SnowGround;
  snowfall: boolean;
  sun: boolean;
  clouds: boolean;
  rainbow?: boolean;
  flowers?: boolean;
}

// 天気IDごとの演出パラメータ。晴れ=穏やかに揺れる/雨=強く揺れる/雷雨=雷+激しく揺れる/
// 雪=地面が白くなる、というユーザー要望をベースに、他の天気(曇り・ネタ天気)も系統に沿って割り当てる。
const SCENE_PARAMS: Record<string, SceneParams> = {
  clear: {
    sky: "from-sky-300 to-sky-100",
    grass: "calm",
    rain: "none",
    lightning: false,
    snowGround: "none",
    snowfall: false,
    sun: true,
    clouds: false,
  },
  cloudy: {
    sky: "from-slate-300 to-slate-200",
    grass: "calm",
    rain: "none",
    lightning: false,
    snowGround: "none",
    snowfall: false,
    sun: false,
    clouds: true,
  },
  rain: {
    sky: "from-slate-500 to-slate-400",
    grass: "breezy",
    rain: "light",
    lightning: false,
    snowGround: "none",
    snowfall: false,
    sun: false,
    clouds: true,
  },
  snow: {
    sky: "from-slate-200 to-sky-100",
    grass: "calm",
    rain: "none",
    lightning: false,
    snowGround: "full",
    snowfall: true,
    sun: false,
    clouds: true,
  },
  sleet: {
    sky: "from-slate-400 to-slate-300",
    grass: "breezy",
    rain: "light",
    lightning: false,
    snowGround: "partial",
    snowfall: true,
    sun: false,
    clouds: true,
  },
  thunderstorm: {
    sky: "from-slate-800 to-slate-600",
    grass: "violent",
    rain: "heavy",
    lightning: true,
    snowGround: "none",
    snowfall: false,
    sun: false,
    clouds: true,
  },
  catrain: {
    sky: "from-slate-400 to-slate-200",
    grass: "calm",
    rain: "light",
    lightning: false,
    snowGround: "none",
    snowfall: false,
    sun: false,
    clouds: true,
  },
  cornflowerfine: {
    sky: "from-sky-300 to-sky-100",
    grass: "calm",
    rain: "none",
    lightning: false,
    snowGround: "none",
    snowfall: false,
    sun: true,
    clouds: false,
    flowers: true,
  },
  camphorcloud: {
    sky: "from-slate-300 to-slate-200",
    grass: "breezy",
    rain: "none",
    lightning: false,
    snowGround: "none",
    snowfall: false,
    sun: false,
    clouds: true,
  },
  eightcolorrain: {
    sky: "from-slate-400 to-sky-200",
    grass: "breezy",
    rain: "light",
    lightning: false,
    snowGround: "none",
    snowfall: false,
    sun: false,
    clouds: true,
    rainbow: true,
  },
  anomalyday: {
    sky: "from-violet-200 to-sky-100",
    grass: "calm",
    rain: "none",
    lightning: false,
    snowGround: "none",
    snowfall: false,
    sun: true,
    clouds: false,
  },
  snowyclear: {
    sky: "from-sky-200 to-slate-100",
    grass: "calm",
    rain: "none",
    lightning: false,
    snowGround: "partial",
    snowfall: true,
    sun: true,
    clouds: false,
  },
};

const GRASS_MOTION: Record<GrassIntensity, { rotate: number[]; duration: number }> = {
  calm: { rotate: [-5, 5, -5], duration: 3.2 },
  breezy: { rotate: [-18, 12, -18], duration: 1.4 },
  violent: { rotate: [-30, 20, -30], duration: 0.6 },
};

const BLADE_COUNT = 16;
const SCENE_HEIGHT_PX = 260; // 演出の落下距離に使う目安の高さ(overflow-hiddenでクリップされる)

/**
 * レンダーのたびに変わらない、見た目だけ乱数っぽい擬似ランダム(0〜1)。
 * Math.randomはSSR/CSRで結果がずれるため使わない。当初sin()を使った手法にしていたが、
 * 三角関数はJSエンジンによって最終桁の丸め方が異なりうる(このサイトのdevサーバーはBun/
 * JavaScriptCore、ブラウザはChromium/V8)ため、SSRとハイドレーションで表示がわずかに
 * ずれるハイドレーションエラーの原因になった。整数演算(乗算・XOR・シフト)のみで
 * 構成したハッシュに置き換え、どの実行エンジンでも完全に同じ値になるようにしている。
 */
function pseudoRandom(seed: number): number {
  let x = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

export default function WeatherScene({ weather }: { weather: WeatherType }) {
  const params = SCENE_PARAMS[weather.id] ?? SCENE_PARAMS.clear;
  const grassMotion = GRASS_MOTION[params.grass];
  const dropCount = params.rain === "heavy" ? 24 : params.rain === "light" ? 12 : 0;
  const flakeCount = params.snowfall ? 18 : 0;

  return (
    <div
      className={`relative h-48 w-full overflow-hidden rounded-xl bg-gradient-to-b sm:h-64 ${params.sky}`}
      role="img"
      aria-label={`${weather.label}のイメージイラスト`}
    >
      {params.sun && (
        <motion.div
          className="absolute top-6 right-8 size-12 rounded-full bg-yellow-300 shadow-[0_0_30px_10px_rgba(253,224,71,0.45)]"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {params.clouds &&
        [
          { left: "10%", top: "18%", size: 60 },
          { left: "55%", top: "12%", size: 44 },
          { left: "75%", top: "28%", size: 52 },
        ].map((cloud, i) => (
          <motion.div
            key={cloud.left}
            className="absolute rounded-full bg-white/70 blur-[2px]"
            style={{ left: cloud.left, top: cloud.top, width: cloud.size, height: cloud.size * 0.6 }}
            animate={{ x: [0, 12, 0] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

      {params.rainbow && (
        <div
          className="absolute -top-10 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full border-8 border-transparent opacity-70"
          style={{
            borderTopColor: "#f87171",
            borderRightColor: "#fbbf24",
            borderLeftColor: "#4ade80",
          }}
          aria-hidden="true"
        />
      )}

      {Array.from({ length: dropCount }, (_, i) => {
        // depth 0=奥(小さく薄く遅い)〜1=手前(大きく濃く速い)で奥行きを出す。
        // 各値は互いに素な倍率でシードをずらし、同じiでも相関しないようにして層状に見えるのを防ぐ。
        const depth = pseudoRandom(i * 7 + 301);
        const left = pseudoRandom(i * 13 + 1) * 100;
        const delay = pseudoRandom(i * 17 + 51) * 1.6;
        const jitter = pseudoRandom(i * 23 + 900) - 0.5; // depthと無関係な追加のばらつき
        const angleJitter = pseudoRandom(i * 5 + 700) - 0.5;
        const isHeavy = params.rain === "heavy";
        // 落下距離(280px程度)に対して速すぎる(=1周期が短すぎる)とコマ落ちして見えるため、
        // 変動幅を控えめにして最低所要時間を確保する(粒ごとの緩急は付けつつ、極端な外れ値を作らない)。
        const duration = (isHeavy ? 0.55 : 0.9) - depth * 0.15 + jitter * 0.16;
        const length = (isHeavy ? 13 : 8) + depth * 11 + jitter * 5;
        const drift = (isHeavy ? 18 : 9) + depth * 10 + jitter * 6; // 風で流れる横方向の距離(画面外に早期退場しない程度に抑える)
        // rotate()は時計回りが正のため、正の角度だと線の下端が左に傾いてしまい、
        // 右方向へのドリフト(風で流れる向き)と逆向きに見えてしまう。符号を反転させて向きを合わせる。
        const angle = -((isHeavy ? 15 : 8) + angleJitter * 14); // 突風で1本ごとに傾きがぶれる
        return (
          <motion.span
            key={i}
            className="absolute top-0 rounded-full"
            style={{
              left: `${Math.min(left, 92)}%`,
              width: 1 + depth * 0.6,
              height: Math.max(4, length),
              opacity: 0.3 + depth * 0.55,
              rotate: angle,
              background: "linear-gradient(to bottom, transparent, rgba(224,242,254,0.95))",
            }}
            animate={{ y: [-20, SCENE_HEIGHT_PX], x: [0, drift] }}
            transition={{ duration: Math.max(0.4, duration), repeat: Infinity, ease: "linear", delay }}
          />
        );
      })}

      {/* 雨粒が地面に落ちた瞬間の跳ねを、間引いた本数だけ演出する。 */}
      {params.rain !== "none" &&
        Array.from({ length: params.rain === "heavy" ? 10 : 5 }, (_, i) => {
          const left = pseudoRandom(i * 19 + 401) * 96 + 2;
          const delay = pseudoRandom(i * 11 + 451) * 1.8;
          const durationJitter = pseudoRandom(i * 3 + 950);
          const duration = (params.rain === "heavy" ? 0.5 : 0.85) + durationJitter * 0.3;
          return (
            <motion.span
              key={i}
              className="absolute bottom-10 h-1 w-2.5 rounded-full border border-sky-100/70"
              style={{ left: `${left}%` }}
              animate={{ scaleX: [0.3, 1.4], opacity: [0.8, 0] }}
              transition={{ duration, repeat: Infinity, ease: "easeOut", delay }}
            />
          );
        })}

      {Array.from({ length: flakeCount }, (_, i) => {
        const left = pseudoRandom(i + 101) * 100;
        const delay = pseudoRandom(i + 151) * 3;
        return (
          <motion.span
            key={i}
            className="absolute top-0 size-1.5 rounded-full bg-white"
            style={{ left: `${left}%` }}
            animate={{ y: [-10, SCENE_HEIGHT_PX], x: [0, 8, -8, 0] }}
            transition={{
              y: { duration: 4 + pseudoRandom(i + 201) * 2, repeat: Infinity, ease: "linear", delay },
              x: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        );
      })}

      {params.lightning && (
        <motion.div
          className="absolute inset-0 bg-white"
          animate={{ opacity: [0, 0, 0.85, 0, 0, 0, 0.6, 0, 0, 0] }}
          transition={{
            duration: 3.4,
            repeat: Infinity,
            ease: "easeOut",
            times: [0, 0.38, 0.4, 0.44, 0.68, 0.84, 0.86, 0.9, 0.95, 1],
          }}
        />
      )}

      {/* 地面。雪の場合は白く積もる演出。 */}
      <div
        className={`absolute inset-x-0 bottom-0 h-10 transition-colors duration-700 ${
          params.snowGround === "full"
            ? "bg-slate-50"
            : params.snowGround === "partial"
              ? "bg-slate-100"
              : "bg-yahari-navy/10"
        }`}
      />
      {params.snowGround !== "none" && (
        <div className="absolute inset-x-0 bottom-6 h-4 rounded-t-full bg-white/90" aria-hidden="true" />
      )}

      {/* 草(積雪時は雪に埋もれて見えにくくなるよう控えめに)。 */}
      {params.snowGround !== "full" && (
        <div className="absolute inset-x-4 bottom-1 flex h-14 items-end justify-around">
          {Array.from({ length: BLADE_COUNT }, (_, i) => (
            <motion.div
              key={i}
              className="w-1 origin-bottom rounded-t-full bg-yahari-navy/60"
              style={{ height: 24 + (i % 3) * 6 }}
              animate={{ rotate: grassMotion.rotate }}
              transition={{
                duration: grassMotion.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i % 5) * 0.08,
              }}
            />
          ))}
        </div>
      )}

      {params.flowers && (
        <div className="absolute inset-x-6 bottom-2 flex justify-around" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <Flower2 key={i} className="size-4 text-yahari-navy/70" />
          ))}
        </div>
      )}
    </div>
  );
}
