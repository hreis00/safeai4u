"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is saved in localStorage or system preference
    const saved = localStorage.getItem("theme");
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldBeDark = saved === "dark" || (!saved && systemDark);

    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="relative"
      aria-label={`Switch to ${isDark ? "light" : "dark"} cyberpunk theme`}
    >
      {isDark ? (
        <span className="flex items-center gap-2">
          🌙 <span className="hidden sm:inline">Intense</span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          ⚡ <span className="hidden sm:inline">Standard</span>
        </span>
      )}
    </Button>
  );
}
