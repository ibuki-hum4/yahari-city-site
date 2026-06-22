"use client";

import Script from "next/script";

export default function XHashtagFeed({ hashtag }: { hashtag: string }) {
  return (
    <div>
      <a
        className="twitter-timeline"
        data-height="600"
        data-theme="light"
        href={`https://twitter.com/search?q=%23${encodeURIComponent(hashtag)}&src=typed_query&f=live`}
      >
        #{hashtag} の投稿
      </a>
      <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
    </div>
  );
}
