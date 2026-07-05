import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/lib/content";
import { getDiscordWidget } from "@/lib/discord";

const STATUS_COLORS: Record<string, string> = {
  online: "bg-emerald-500",
  idle: "bg-amber-500",
  dnd: "bg-red-500",
  offline: "bg-gray-400",
};

export default async function DiscordWidget() {
  if (!SITE.discordGuildId) {
    return (
      <Card className="border-2 border-dashed border-yahari-sky bg-yahari-sky-light shadow-none">
        <CardContent className="text-center text-sm text-yahari-navy/80">
          Discordウィジェットは準備中です。
        </CardContent>
      </Card>
    );
  }

  const widget = await getDiscordWidget();

  if (!widget) {
    return (
      <Card className="border-2 border-dashed border-yahari-sky bg-yahari-sky-light shadow-none">
        <CardContent className="text-center text-sm text-yahari-navy/80">
          現在Discordウィジェットを取得できません。しばらくしてから再度お試しください。
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-yahari-sky-light shadow-none">
      <CardContent>
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-yahari-navy">{widget.name}</h3>
          <Badge className="bg-white text-yahari-navy">
            オンライン {widget.presence_count}人
          </Badge>
        </div>
        <ul className="mt-4 flex flex-wrap gap-3">
          {widget.members.map((member) => (
            <li key={member.id} className="flex w-14 flex-col items-center gap-1">
              <span className="relative" title={member.game ? `${member.username} (${member.game.name})` : member.username}>
                <Image
                  src={member.avatar_url}
                  alt={member.username}
                  width={40}
                  height={40}
                  unoptimized
                  className="rounded-full"
                />
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-yahari-sky-light ${
                    STATUS_COLORS[member.status] ?? STATUS_COLORS.offline
                  }`}
                />
              </span>
              <span className="w-full truncate text-center text-[10px] text-muted-foreground">{member.username}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
