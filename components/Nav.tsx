"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0b0d12]/80 backdrop-blur border-b border-gray-200 dark:border-white/10">
      <nav className="container py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">{`</>`}</span>
          </div>
          <span className="text-2xl font-bold gradient-text">
            NextPrompt.tech
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            className="font-medium text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white"
            href="/packs"
          >
            Prompt Packs
          </Link>
          <Link
            className="font-medium text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white"
            href="/pricing"
          >
            Pricing
          </Link>
          <Link
            className="font-medium text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white"
            href="/account"
          >
            Account
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/pricing" className="btn">
            Upgrade
          </Link>
        </div>
      </nav>
    </header>
  );
}
