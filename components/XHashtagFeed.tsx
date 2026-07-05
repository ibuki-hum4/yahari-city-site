"use client";

import Script from "next/script";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function XHashtagFeed({ hashtag }: { hashtag: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-yahari-navy">#{hashtag} の投稿</CardTitle>
      </CardHeader>
      <CardContent>
        <a
          className="twitter-timeline"
          data-height="600"
          data-theme="light"
          href={`https://twitter.com/search?q=%23${encodeURIComponent(hashtag)}&src=typed_query&f=live`}
        >
          #{hashtag} の投稿
        </a>
        <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
      </CardContent>
    </Card>
  );
}
