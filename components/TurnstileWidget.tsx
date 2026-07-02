"use client";

import Script from "next/script";
import { useId, useRef } from "react";

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

export default function TurnstileWidget({
  siteKey,
  onToken,
}: {
  siteKey: string | null;
  onToken: (token: string) => void;
}) {
  const containerId = useId();
  const rendered = useRef(false);

  if (!siteKey) {
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
