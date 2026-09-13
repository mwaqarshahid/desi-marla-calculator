"use client";

import Logo from "@/components/Logo";
import { useLanguage } from "@/components/LanguageProvider";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function Header() {
  const { t, locale, setLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full px-4 sm:px-6 py-3 sm:py-4 border-b border-soil-200/80 dark:border-white/10 bg-white/80 dark:bg-soil-900/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
        <Logo />
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setLocale(locale === "en" ? "ur" : "en")}
            className="inline-flex items-center justify-center h-10 px-3 rounded-lg text-sm font-medium text-soil-700 dark:text-soil-200 bg-soil-100 dark:bg-soil-800 hover:bg-soil-200 dark:hover:bg-soil-700 transition-colors"
            aria-label={t("language")}
            title={t("language")}
          >
            <span>{locale === "en" ? "EN" : "اردو"}</span>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-soil-700 dark:text-soil-200 bg-soil-100 dark:bg-soil-800 hover:bg-soil-200 dark:hover:bg-soil-700 transition-colors"
            aria-label={theme === "light" ? t("dark") : t("light")}
            title={theme === "light" ? t("dark") : t("light")}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" aria-hidden />
            ) : (
              <Sun className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
