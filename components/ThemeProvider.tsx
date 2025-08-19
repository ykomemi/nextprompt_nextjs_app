"use client";
import { useEffect, useState } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Prefer saved theme, fallback to system (light default for your spec)
    const saved = localStorage.getItem("np_theme");
    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    ).matches;
    const enableDark = saved
      ? saved === "dark"
      : prefersDark === true
      ? false
      : false; // default light
    document.documentElement.classList.toggle("dark", enableDark);
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>; // avoid hydration flash
  return <>{children}</>;
}
