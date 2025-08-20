"use client";

import { useEffect, useMemo, useState } from "react";
import PackCard, { Pack } from "@/components/PackCard";

export default function PacksPage() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [limit, setLimit] = useState(6); // load more pagination

  useEffect(() => {
    fetch("/packs.json")
      .then((r) => r.json())
      .then((data: Pack[]) => setPacks(data));
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    packs.forEach((p) => p.category && set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [packs]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return packs.filter((p) => {
      const matchesQ =
        !term ||
        (p.title + " " + p.description).toLowerCase().includes(term) ||
        (p.category || "").toLowerCase().includes(term);
      const matchesCat = cat === "All" || (p.category || "") === cat;
      return matchesQ && matchesCat;
    });
  }, [packs, q, cat]);

  const visible = filtered.slice(0, limit);
  const canLoadMore = limit < filtered.length;

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="w-full bg-white py-16 border-b border-gray-200 -mx-[24px] md:-mx-[24px] lg:-mx-[24px]">
        {/* stretch to edges while keeping inner container */}
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Prompt Pack Library
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready-to-use prompt collections for every development need
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <input
                placeholder="Search prompt packs..."
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setLimit(6);
                }}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-indigo-200/40"
              />
            </div>
            <div className="relative">
              <select
                value={cat}
                onChange={(e) => {
                  setCat(e.target.value);
                  setLimit(6);
                }}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-6 py-4 pr-12 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-indigo-200/40 cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                ▾
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="w-full bg-gray-50 py-16 -mx-[24px] md:-mx-[24px] lg:-mx-[24px]">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((p) => (
              <PackCard key={p.slug} pack={p} />
            ))}
          </div>

          <div className="text-center mt-16">
            {canLoadMore ? (
              <button
                onClick={() => setLimit((n) => n + 6)}
                className="bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:shadow-lg transition-all"
              >
                <span className="mr-2">＋</span> Load More Packs
              </button>
            ) : (
              filtered.length === 0 && (
                <p className="text-gray-500">No packs match your search.</p>
              )
            )}
          </div>
        </div>
      </section>

      {/* Gradient CTA */}
      <section className="w-full gradient-bg py-16 -mx-[24px] md:-mx-[24px] lg:-mx-[24px]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Unlock All Prompt Packs
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get access to 500+ professional prompts across all categories
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              className="bg-white text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 hover:shadow-xl transition-all"
              href="/pricing"
            >
              <span className="mr-2">👑</span> Upgrade to Pro
            </a>
            <a
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all"
              href="/pricing"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
