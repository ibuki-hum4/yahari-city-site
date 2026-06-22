import Image from "next/image";
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
      <div className="rounded-lg border-2 border-dashed border-yahari-sky bg-yahari-sky-light p-6 text-center text-sm text-yahari-navy/80">
        Discordウィジェットは準備中です。
      </div>
    );
  }

  const widget = await getDiscordWidget();

  if (!widget) {
    return (
      <div className="rounded-lg border-2 border-dashed border-yahari-sky bg-yahari-sky-light p-6 text-center text-sm text-yahari-navy/80">
        現在Discordウィジェットを取得できません。しばらくしてから再度お試しください。
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-yahari-sky-light p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-yahari-navy">{widget.name}</h3>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-yahari-navy">
          オンライン {widget.presence_count}人
        </span>
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
            <span className="w-full truncate text-center text-[10px] text-gray-700">{member.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
