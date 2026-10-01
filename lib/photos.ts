export interface Photo {
  src: string;
  alt: string;
  caption: string;
  album: string;
  relatedHref?: string;
  relatedLabel?: string;
}

export const PHOTO_ALBUMS = ["日常", "周年"] as const;

export const PHOTOS: Photo[] = [
  {
    src: "/op.png",
    alt: "盛り上がる雑談チャンネルの一幕",
    caption: "盛り上がる雑談チャンネルの一幕",
    album: "日常",
  },
  {
    src: "/4kagetsu.png",
    alt: "矢張市創立4か月を祝うメッセージ",
    caption: "矢張市創立4か月を祝うメッセージ",
    album: "周年",
    relatedHref: "/history",
    relatedLabel: "沿革ページで見る",
  },
  {
    src: "/bazuttaraokutokoro.png",
    alt: "「#バズったら置くところ」チャンネルの一幕",
    caption: "「#バズったら置くところ」チャンネルの一幕",
    album: "日常",
  },
];
