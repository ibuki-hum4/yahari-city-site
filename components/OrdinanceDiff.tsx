import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toZenkakuNumber } from "@/lib/ordinances";

export default function OrdinanceDiff({
  articleNumber,
  before,
  after,
}: {
  articleNumber?: number;
  before?: string;
  after?: string;
}) {
  if (!after) return null;

  return (
    <Card size="sm" className="mt-2 bg-muted shadow-none">
      <CardContent className="text-sm leading-relaxed">
        {articleNumber && (
          <p className="mb-2 text-xs font-semibold text-muted-foreground">第{toZenkakuNumber(articleNumber)}条</p>
        )}
        {before ? (
          <>
            <p className="text-red-600">
              <Badge variant="destructive" className="mr-2 align-middle">
                改正前
              </Badge>
              <span className="line-through decoration-red-500/70">{before}</span>
            </p>
            <p className="mt-2 text-green-700">
              <Badge className="mr-2 bg-green-700 align-middle text-white">改正後</Badge>
              {after}
            </p>
          </>
        ) : (
          <p className="text-green-700">
            <Badge className="mr-2 bg-green-700 align-middle text-white">新設</Badge>
            {after}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
