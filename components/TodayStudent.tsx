import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getTodayStudent } from "@/lib/bluearchive";

export default async function TodayStudent() {
  const student = await getTodayStudent();
  if (!student) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-baseline gap-2">
        <h2 className="text-xl font-bold text-yahari-navy">今日の生徒紹介</h2>
        <Badge className="bg-yahari-navy text-white">ブルーアーカイブ</Badge>
      </div>
      <Card className="mt-6 border-yahari-sky bg-yahari-sky-light/40">
        <CardContent>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-bold text-yahari-navy">{student.name}</h3>
            <span className="text-sm font-semibold text-yahari-navy" aria-label={`レア度${student.rarity}`}>
              {"★".repeat(student.rarity)}
            </span>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs font-semibold text-muted-foreground">出身校</dt>
              <dd className="mt-0.5 text-foreground">{student.school}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-muted-foreground">役割</dt>
              <dd className="mt-0.5 text-foreground">
                {student.role.class} ・ {student.role.position}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-muted-foreground">武器</dt>
              <dd className="mt-0.5 text-foreground">{student.weapon.type}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-muted-foreground">攻撃属性</dt>
              <dd className="mt-0.5 text-foreground">{student.combat.attackType}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-muted-foreground">防御属性</dt>
              <dd className="mt-0.5 text-foreground">{student.combat.defenseType}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-muted-foreground">地形適性(市街地/屋外/屋内)</dt>
              <dd className="mt-0.5 text-foreground">
                {student.terrainAdaptation.city} / {student.terrainAdaptation.outdoor} / {student.terrainAdaptation.indoor}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </section>
  );
}
