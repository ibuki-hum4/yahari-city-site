import { Info } from "lucide-react";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import AdvisoryBadge, { advisoryLevelLabel } from "@/components/AdvisoryBadge";
import PageHeader from "@/components/PageHeader";
import WeatherIcon from "@/components/WeatherIcon";
import WeatherScene from "@/components/WeatherScene";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pageMetadata } from "@/lib/content";
import {
  getTodayAccuracy,
  getTodayAdvisory,
  getTodayWeather,
  getWeeklyForecast,
  isAccuracyRevealed,
  WEATHER_TYPES,
} from "@/lib/weather";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = pageMetadata("/weather");

export default async function WeatherPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const weather = getTodayWeather();
  const advisory = getTodayAdvisory();
  const revealed = isAccuracyRevealed();
  const accuracy = getTodayAccuracy();
  const weeklyForecast = getWeeklyForecast();

  return (
    <>
      <PageHeader
        title="矢張市の天気"
        path="/weather"
        lead="架空の天気を毎日ランダムに抽選してお届けしています。実在の気象情報とは一切関係ありません。"
      />

      <section className="mx-auto max-w-4xl px-4 py-8">
        <Alert>
          <Info />
          <AlertTitle>ご利用にあたって</AlertTitle>
          <AlertDescription>
            このページの天気・警報注意報・的中率・週間天気はすべて日付をもとにしたジョークコンテンツで、実際の気象状況とは無関係です。実在の警報・注意報や防災情報は
            <Link href="/bosai" className="underline">
              矢張市防災ポータル
            </Link>
            (気象庁の公開データを使用)をご確認ください。
          </AlertDescription>
        </Alert>
      </section>

      {/* 本日の天気(大きな演出枠) */}
      <section className="mx-auto max-w-4xl px-4 py-4">
        <Card size="sm">
          <CardContent className="space-y-4">
            <WeatherScene weather={weather} />
            <div className="flex items-center gap-3">
              <WeatherIcon icon={weather.icon} className="size-8 shrink-0 text-yahari-navy" />
              <div>
                <p className="text-lg font-bold text-yahari-navy">
                  {weather.label}
                  {weather.reading && (
                    <span className="ml-1 text-sm font-normal text-muted-foreground">
                      ({weather.reading})
                    </span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">{weather.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 警報・注意報 / 的中率(2カラム) */}
      <section className="mx-auto grid max-w-4xl gap-4 px-4 py-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>警報・注意報</CardTitle>
          </CardHeader>
          <CardContent>
            {advisory ? (
              <>
                <AdvisoryBadge advisory={advisory} />
                <p className="mt-2 text-sm text-muted-foreground">
                  本日は{weather.label}に伴い、{advisory.level}「{advisory.label}」が発表されています(
                  {advisoryLevelLabel(advisory.level)})。
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                本日は警報・注意報の発表はありません。
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>的中率</CardTitle>
          </CardHeader>
          <CardContent>
            {revealed ? (
              <>
                <p className="text-3xl font-bold text-yahari-navy">{accuracy}%</p>
                <p className="mt-1 text-sm text-muted-foreground">本日の天気予報の的中率です。</p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                本日の的中率は21:00に発表予定です。
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* 週間天気(月曜始まり、1週間に1度だけ抽選) */}
      <section className="mx-auto max-w-4xl px-4 py-8">
        <h2 className="text-xl font-bold text-yahari-navy">週間天気</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          今週分の「予報」です。週替わりで抽選するため、上に表示している本日の「実況」の天気とは食い違うことがあります(それも含めて的中率の対象です)。
        </p>
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">
          {weeklyForecast.map((day) => (
            <Card
              key={day.dateKey}
              size="sm"
              className={day.isToday ? "ring-2 ring-yahari-navy" : undefined}
            >
              <CardContent className="flex flex-col items-center gap-1 text-center">
                <p className="text-xs font-semibold text-muted-foreground">
                  {day.weekdayLabel}
                  {day.isToday && <span className="ml-1 text-yahari-navy">(今日)</span>}
                </p>
                <WeatherIcon icon={day.weather.icon} className="size-6 text-yahari-navy" />
                <p className="text-xs font-medium text-foreground">{day.weather.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8">
        <h2 className="text-xl font-bold text-yahari-navy">天気ラインナップ</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          矢張市の天気は、この{WEATHER_TYPES.length}種類の中から抽選されます。
        </p>
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {WEATHER_TYPES.map((type) => (
            <li key={type.id} className="flex items-start gap-3 py-3">
              <WeatherIcon icon={type.icon} className="size-6 shrink-0 text-yahari-navy" />
              <div>
                <p className="flex flex-wrap items-center gap-2 font-semibold text-foreground">
                  {type.label}
                  {type.reading && (
                    <span className="text-xs font-normal text-muted-foreground">
                      ({type.reading})
                    </span>
                  )}
                  {type.gag && <Badge variant="secondary">言葉遊び</Badge>}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">{type.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
