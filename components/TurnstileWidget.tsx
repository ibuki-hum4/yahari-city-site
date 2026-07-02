"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: { sitekey: string; callback: (token: string) => void; "expired-callback"?: () => void }
      ) => string;
    };
  }
}

export default function TurnstileWidget({ onToken }: { onToken: (token: string) => void }) {
  const containerId = useId();
  const rendered = useRef(false);
  const [siteKey, setSiteKey] = useState<string | null | undefined>(undefined);

  // /news/[slug]・/column/[slug]は静的HTML化されるため、サイトキーはビルド時ではなく
  // 実行時にAPI経由で取得する(app/api/turnstile-site-key/route.ts参照)
  useEffect(() => {
    let cancelled = false;
    fetch("/api/turnstile-site-key")
      .then((res) => res.json())
      .then((data: { siteKey: string | null }) => {
        if (!cancelled) setSiteKey(data.siteKey);
      })
      .catch(() => {
        if (!cancelled) setSiteKey(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (siteKey === undefined || !siteKey) {
    return <p className="text-xs text-gray-500">認証ウィジェットは準備中です。</p>;
  }

  const renderWidget = () => {
    if (rendered.current) return;
    const container = document.getElementById(containerId);
    if (!container || !window.turnstile) return;
    window.turnstile.render(container, {
      sitekey: siteKey,
      callback: onToken,
      "expired-callback": () => onToken(""),
    });
    rendered.current = true;
  };

  return (
    <div>
      <div id={containerId} />
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="lazyOnload"
        onReady={renderWidget}
        onLoad={renderWidget}
      />
    </div>
  );
}
