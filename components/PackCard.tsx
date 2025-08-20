import Link from "next/link";

type Prompt = {
  title: string;
  body: string;
  locked: boolean;
  preview?: string;
};
export type Pack = {
  slug: string;
  title: string;
  description: string;
  tier: "Free" | "Pro" | string;
  category?: string;
  prompts: Prompt[];
};

function CategoryBadge({ cat }: { cat?: string }) {
  if (!cat) return null;
  const colors: Record<string, string> = {
    Frontend: "bg-blue-100 text-blue-700",
    Backend: "bg-purple-100 text-purple-700",
    Database: "bg-green-100 text-green-700",
    DevOps: "bg-orange-100 text-orange-700",
    Mobile: "bg-pink-100 text-pink-700",
    "AI/ML": "bg-indigo-100 text-indigo-700",
  };
  const cls = colors[cat] ?? "bg-gray-100 text-gray-700";
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${cls}`}>
      {cat}
    </span>
  );
}

export default function PackCard({ pack }: { pack: Pack }) {
  const first = pack.prompts?.[0];
  const lockedCount = pack.prompts?.filter((p) => p.locked).length ?? 0;
  const isFree = (pack.tier || "").toLowerCase() === "free";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <CategoryBadge cat={pack.category} />
          <span
            className={`text-sm font-semibold ${
              isFree ? "text-green-600" : "text-gray-400"
            }`}
          >
            {isFree ? "FREE PREVIEW" : "PRO"}
          </span>
        </div>

        <Link href={`/pack/${pack.slug}`} className="block">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {pack.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-6">{pack.description}</p>

        {/* preview block */}
        {first && (
          <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Preview Prompt:
              </span>
              <span className="text-gray-400" aria-hidden>
                👁️
              </span>
            </div>
            <p className="text-sm text-gray-800 font-mono bg-white p-3 rounded-lg border border-gray-200">
              {(first.locked ? first.preview : first.body) || ""}
            </p>
          </div>
        )}

        {/* blurred locked placeholders */}
        {lockedCount > 0 && (
          <div className="space-y-3 select-none pointer-events-none">
            <div className="bg-gray-50 rounded-xl p-4 blur-[3px]"></div>
            <div className="bg-gray-50 rounded-xl p-4 blur-[3px]"></div>
          </div>
        )}

        <div className="text-center py-4 border-t border-gray-200 mt-4">
          {lockedCount > 0 ? (
            <>
              <p className="text-gray-600 mb-3">
                <span aria-hidden>🔒</span> {lockedCount} more prompts locked
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gradient-bg text-white px-6 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
              >
                Upgrade to Unlock
              </Link>
            </>
          ) : (
            <Link
              href={`/pack/${pack.slug}`}
              className="inline-flex items-center justify-center bg-white border border-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
            >
              View Pack
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
