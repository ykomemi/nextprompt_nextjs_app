"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <nav className="container py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">{`</>`}</span>
          </div>
          <span className="text-2xl font-bold gradient-text">
            NextPrompt.tech
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-slate-600">
          <Link href="/packs" className="hover:text-slate-900 font-medium">
            Prompt Packs
          </Link>
          <Link href="/pricing" className="hover:text-slate-900 font-medium">
            Pricing
          </Link>
          <Link href="/account" className="hover:text-slate-900 font-medium">
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
