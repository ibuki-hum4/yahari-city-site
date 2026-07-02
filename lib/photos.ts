export interface Photo {
  src: string;
  alt: string;
  caption: string;
  album: string;
  relatedHref?: string;
  relatedLabel?: string;
}

export const PHOTO_ALBUMS = ["耐久VC記録", "日常", "周年"] as const;

export const PHOTOS: Photo[] = [
  {
    src: "/224,48,00.png",
    alt: "歴代記録、224時間48分の耐久VC",
    caption: "歴代記録、224時間48分の耐久VC",
    album: "耐久VC記録",
    relatedHref: "/legends",
    relatedLabel: "殿堂入りページで見る",
  },
  {
    src: "/op.png",
    alt: "盛り上がる雑談チャンネルの一幕",
    caption: "盛り上がる雑談チャンネルの一幕",
    album: "日常",
  },
  {
    src: "/chojikan-vc.png",
    alt: "新記録、293時間56分19秒の耐久VC",
    caption: "新記録、293時間56分19秒の耐久VC",
    album: "耐久VC記録",
    relatedHref: "/legends",
    relatedLabel: "殿堂入りページで見る",
  },
  {
    src: "/300zikan.png",
    alt: "新記録、300時間の耐久VC",
    caption: "新記録、300時間の耐久VC",
    album: "耐久VC記録",
    relatedHref: "/legends",
    relatedLabel: "殿堂入りページで見る",
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
