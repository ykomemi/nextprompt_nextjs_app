"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("np_theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="btn-secondary flex items-center gap-2"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Sun / Moon minimal icons (no extra libs) */}
      <span aria-hidden>{dark ? "☀️" : "🌙"}</span>
      <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
    </button>
  );
}
