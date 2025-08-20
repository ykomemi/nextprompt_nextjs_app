"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Prompt = {
  title: string;
  body: string;
  locked: boolean;
  preview?: string;
};
type Pack = {
  slug: string;
  title: string;
  description: string;
  tier: string;
  category?: string;
  prompts: Prompt[];
};

export default function PackPage({ params }: { params: { slug: string } }) {
  const [pack, setPack] = useState<Pack | null>(null);

  useEffect(() => {
    fetch("/packs.json")
      .then((r) => r.json())
      .then((items: Pack[]) => {
        setPack(items.find((p) => p.slug === params.slug) || null);
      });
  }, [params.slug]);

  const lockedCount = useMemo(
    () => (pack?.prompts || []).filter((p) => p.locked).length,
    [pack]
  );

  if (!pack) return <div>Loading…</div>;

  return (
    <div className="w-full">
      {/* Header (full-bleed white like UX Pilot) */}
      <section className="w-full bg-white border-b border-gray-200 -mx-[24px] md:-mx-[24px] lg:-mx-[24px]">
        <div className="container py-12">
          {/* breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Link href="/packs" className="hover:text-purple-600">
              Prompt Packs
            </Link>
            <span className="mx-3 text-xs">›</span>
            <span className="text-gray-900">{pack.title}</span>
          </div>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                {pack.category && (
                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                    {pack.category}
                  </span>
                )}
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                  {pack.prompts?.length ?? 0} Prompts
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {pack.title}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl">
                {pack.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content grid */}
      <section className="w-full bg-gray-50 -mx-[24px] md:-mx-[24px] lg:-mx-[24px]">
        <div className="container py-12 grid lg:grid-cols-3 gap-8">
          {/* Prompts list */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Prompts in this Pack
            </h2>

            <div className="space-y-4">
              {(pack.prompts || []).map((pr, i) => (
                <PromptAccordion
                  key={i}
                  id={`prompt-${i}`}
                  index={i + 1}
                  prompt={pr}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">👑</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Unlock All Prompts
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Get access to all {pack.prompts?.length ?? 0} prompts in
                    this pack
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  {lockedCount > 0 ? (
                    <FeatureRow
                      text={`${lockedCount} additional premium prompts`}
                    />
                  ) : (
                    <FeatureRow text="All prompts available" />
                  )}
                  <FeatureRow text="Implementation guides" />
                  <FeatureRow text="Integration examples & code snippets" />
                  <FeatureRow text="Access to all packs" />
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      $10
                      <span className="text-lg font-normal text-gray-600">
                        /mo
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Cancel anytime</p>
                  </div>
                </div>

                <form action="/api/checkout" method="post">
                  <button
                    type="submit"
                    className="w-full gradient-bg text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 mb-4"
                  >
                    Upgrade to Pro
                  </button>
                </form>

                <Link
                  href="/pricing"
                  className="w-full inline-flex items-center justify-center border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

/* ---------- Components ---------- */

function FeatureRow({ text }: { text: string }) {
  return (
    <div className="flex items-center text-sm text-gray-600">
      <span className="mr-3">✅</span>
      <span>{text}</span>
    </div>
  );
}

function PromptAccordion({
  id,
  index,
  prompt,
}: {
  id: string;
  index: number;
  prompt: Prompt;
}) {
  const [open, setOpen] = useState(false);
  const locked = prompt.locked;

  const copy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (locked) return;
    try {
      await navigator.clipboard.writeText(prompt.body);
      const btn = e.currentTarget;
      const orig = btn.textContent;
      btn.textContent = "✓ Copied!";
      btn.classList.add("bg-emerald-500", "text-white");
      setTimeout(() => {
        btn.textContent = orig || "Copy";
        btn.classList.remove("bg-emerald-500", "text-white");
      }, 1500);
    } catch {}
  };

  return (
    <div
      id={id}
      className={`bg-white rounded-xl border border-gray-200 overflow-hidden relative ${
        open && !locked ? "accordion-open" : ""
      }`}
    >
      {/* Locked overlay */}
      {locked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl locked-overlay">
          <div className="text-center">
            <span className="text-gray-400 text-2xl mb-3 block">🔒</span>
            <p className="text-gray-600 font-semibold mb-2">Locked Content</p>
            <Link
              href="/pricing"
              className="gradient-bg text-white px-6 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all inline-flex"
            >
              Upgrade to Unlock
            </Link>
          </div>
        </div>
      )}

      {/* Header line (click to expand) */}
      <button
        className={`w-full text-left p-6 cursor-pointer flex items-center justify-between ${
          locked ? "opacity-50" : ""
        }`}
        onClick={() => !locked && setOpen((v) => !v)}
      >
        <div className="flex items-center space-x-4">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              locked ? "bg-gray-100" : "bg-green-100"
            }`}
          >
            <span className={locked ? "text-gray-400" : "text-green-600"}>
              {locked ? "🔒" : "🔓"}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {prompt.title || `Prompt ${index}`}
            </h3>
            <p className="text-gray-600 text-sm">
              {locked
                ? "Locked — upgrade to see the full text"
                : "Click to expand and copy"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={copy}
            disabled={locked}
            className={`copy-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              locked
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            {locked ? "Locked" : "Copy"}
          </button>
          <span
            className={`text-gray-400 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden
          >
            ▾
          </span>
        </div>
      </button>

      {/* Body */}
      {!locked && open && (
        <div className="px-6 pb-6">
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-800 border border-gray-200 whitespace-pre-wrap">
            {prompt.body}
          </div>
        </div>
      )}
    </div>
  );
}
