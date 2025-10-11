"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper function to set theme and cookie
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    // Set cookie for server-side rendering
    document.cookie = `theme=${newTheme}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  };

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="relative w-24">
        <span className="h-4" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => handleThemeChange(isDark ? "light" : "dark")}
      className="relative"
      aria-label={`Switch to ${isDark ? "Safe Mode" : "Cyber Mode"} theme`}
    >
      {isDark ? (
        <span className="flex items-center gap-2">
          🌙 <span className="hidden sm:inline">Cyber Mode</span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          ⚡ <span className="hidden sm:inline">Safe Mode</span>
        </span>
      )}
    </Button>
  );
}
