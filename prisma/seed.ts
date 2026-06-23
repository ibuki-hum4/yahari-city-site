import { prisma } from "../lib/prisma";

const SAMPLE_GROUPS = [
  {
    registrationNumber: "第1号",
    name: "春巻き同好会",
    representative: "まきまき",
    activity: "月1回、春巻きを食べながら雑談するVCを開催しています。",
  },
  {
    registrationNumber: "第2号",
    name: "VC耐久部",
    representative: "そら",
    activity: "耐久VCの企画運営と、歴代記録の更新を目指す活動を行っています。",
  },
  {
    registrationNumber: "第3号",
    name: "推し活互助会",
    representative: "つき",
    activity: "推し活に関する情報交換会と、不定期のオフ会(VC)を実施しています。",
  },
  {
    registrationNumber: "第4号",
    name: "矢張市検定愛好会",
    representative: "ひかり",
    activity: "教育委員会が構想中の「矢張市検定」の出題案を考える非公式サークルです。",
  },
];

async function main() {
  await prisma.citizenGroup.createMany({ data: SAMPLE_GROUPS, skipDuplicates: true });
  console.log(`seeded ${SAMPLE_GROUPS.length} citizen groups (existing entries skipped)`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
