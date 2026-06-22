import { SITE } from "@/lib/content";

export interface DiscordWidgetMember {
  id: string;
  username: string;
  avatar_url: string;
  status: "online" | "idle" | "dnd" | "offline";
  game?: { name: string };
}

export interface DiscordWidgetData {
  name: string;
  instant_invite: string | null;
  presence_count: number;
  members: DiscordWidgetMember[];
}

export async function getDiscordWidget(): Promise<DiscordWidgetData | null> {
  if (!SITE.discordGuildId) return null;
  try {
    const res = await fetch(`https://discord.com/api/guilds/${SITE.discordGuildId}/widget.json`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as DiscordWidgetData;
  } catch {
    return null;
  }
}
