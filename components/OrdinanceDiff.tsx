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
    <div className="mt-2 rounded border border-gray-200 bg-gray-50 p-3 text-sm leading-relaxed">
      {articleNumber && (
        <p className="mb-2 text-xs font-semibold text-gray-500">第{toZenkakuNumber(articleNumber)}条</p>
      )}
      {before ? (
        <>
          <p className="text-red-600">
            <span className="mr-1 text-xs font-semibold">改正前</span>
            <span className="line-through decoration-red-500/70">{before}</span>
          </p>
          <p className="mt-2 text-green-700">
            <span className="mr-1 text-xs font-semibold">改正後</span>
            {after}
          </p>
        </>
      ) : (
        <p className="text-green-700">
          <span className="mr-1 text-xs font-semibold">新設</span>
          {after}
        </p>
      )}
    </div>
  );
}
