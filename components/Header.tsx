"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Logo from "@/components/Logo";
import { useLanguage } from "@/components/LanguageProvider";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon, Languages, Menu, X, Calculator, Ruler } from "lucide-react";
import type { SubtitleKey } from "@/lib/constants";
import { useCalculatorTab, type CalculatorTab } from "@/components/CalculatorTabProvider";

interface HeaderProps {
  subtitleKey: SubtitleKey;
}

const navLinkClass = (active: boolean) =>
  `inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    active
      ? "bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent-light"
      : "text-soil-600 dark:text-soil-300 hover:bg-soil-100 dark:hover:bg-soil-800 hover:text-soil-950 dark:hover:text-white"
  }`;

export default function Header({ subtitleKey }: HeaderProps) {
  const { t, locale, setLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { tab, setTab } = useCalculatorTab();
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const [hamburgerRect, setHamburgerRect] = useState<DOMRect | null>(null);

  const selectMode = (next: CalculatorTab) => {
    setTab(next);
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen || !hamburgerRef.current) return;
    const rect = hamburgerRef.current.getBoundingClientRect();
    setHamburgerRect(rect);
  }, [menuOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      const portalRoot = document.getElementById("header-menu-portal");
      if (portalRoot?.contains(target)) return;
      if (hamburgerRef.current?.contains(target)) return;
      setMenuOpen(false);
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const LanguageButton = () => (
    <button
      type="button"
      onClick={() => {
        setLocale(locale === "en" ? "ur" : "en");
        setMenuOpen(false);
      }}
      className="inline-flex items-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-medium text-soil-700 dark:text-soil-200 bg-soil-100 dark:bg-soil-800 hover:bg-soil-200 dark:hover:bg-soil-700 transition-colors"
      aria-label={t("language")}
    >
      <Languages className="h-5 w-5 text-accent dark:text-accent-light shrink-0" aria-hidden />
      <span>{t("language")}</span>
      <span className="ms-auto font-semibold">{locale === "en" ? "EN" : "اردو"}</span>
    </button>
  );

  const ThemeButton = () => (
    <button
      type="button"
      onClick={() => {
        toggleTheme();
        setMenuOpen(false);
      }}
      className="inline-flex items-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-medium text-soil-700 dark:text-soil-200 bg-soil-100 dark:bg-soil-800 hover:bg-soil-200 dark:hover:bg-soil-700 transition-colors"
      aria-label={theme === "light" ? t("dark") : t("light")}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-accent shrink-0" aria-hidden />
      ) : (
        <Sun className="h-5 w-5 text-accent-light shrink-0" aria-hidden />
      )}
      <span>{t("theme")}</span>
      <span className="ms-auto font-semibold">{theme === "light" ? t("light") : t("dark")}</span>
    </button>
  );

  return (
    <header className="w-full px-4 sm:px-6 py-3 sm:py-4 border-b border-soil-200/80 dark:border-white/10 bg-white/80 dark:bg-soil-900/80 backdrop-blur-md relative">
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between gap-4 ${menuOpen ? "relative z-50" : ""}`}
      >
        <div className="flex flex-col gap-1 min-w-0 flex-1 md:flex-row md:items-center md:gap-6">
          <Logo />
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            <button
              type="button"
              aria-pressed={tab === "marla"}
              onClick={() => selectMode("marla")}
              className={navLinkClass(tab === "marla")}
            >
              <Calculator className="h-4 w-4" aria-hidden />
              {t("calculator.tabMarla")}
            </button>
            <button
              type="button"
              aria-pressed={tab === "sqft"}
              onClick={() => selectMode("sqft")}
              className={navLinkClass(tab === "sqft")}
            >
              <Ruler className="h-4 w-4" aria-hidden />
              {t("calculator.tabSqFt")}
            </button>
          </nav>
          <p className="text-soil-500 dark:text-soil-400 font-medium text-sm md:hidden">
            {t(subtitleKey)}
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <p className="hidden lg:block text-sm text-soil-500 dark:text-soil-400 me-2 max-w-xs truncate">
            {t(subtitleKey)}
          </p>
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
        <div className="md:hidden shrink-0">
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-soil-700 dark:text-soil-200 bg-soil-100 dark:bg-soil-800 hover:bg-soil-200 dark:hover:bg-soil-700 transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>
      {menuOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            id="header-menu-portal"
            className="fixed inset-0 z-[100] md:hidden"
            role="presentation"
          >
            <div
              className="absolute inset-0 bg-black/30 dark:bg-black/50"
              aria-hidden
              onClick={() => setMenuOpen(false)}
            />
            <div
              className="absolute end-0 w-64 max-w-[85vw] me-4 rounded-xl border border-soil-200 dark:border-white/10 bg-white dark:bg-soil-900 shadow-lg py-2 z-[101]"
              role="menu"
              style={{
                top: hamburgerRect ? `${hamburgerRect.bottom + 8}px` : "5rem",
              }}
            >
              <div className="px-2 pb-2 border-b border-soil-200 dark:border-white/10 mb-2">
                <p className="text-xs font-semibold text-soil-500 dark:text-soil-400 uppercase tracking-wider px-2">
                  {t("quickLinks")}
                </p>
              </div>
              <div className="px-2 space-y-1 mb-2">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => selectMode("marla")}
                  className={navLinkClass(tab === "marla") + " w-full"}
                >
                  <Calculator className="h-4 w-4" aria-hidden />
                  {t("calculator.tabMarla")}
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => selectMode("sqft")}
                  className={navLinkClass(tab === "sqft") + " w-full"}
                >
                  <Ruler className="h-4 w-4" aria-hidden />
                  {t("calculator.tabSqFt")}
                </button>
              </div>
              <div className="px-2 pb-2 border-b border-soil-200 dark:border-white/10 mb-2">
                <p className="text-xs font-semibold text-soil-500 dark:text-soil-400 uppercase tracking-wider px-2">
                  {t("language")} &amp; {t("theme")}
                </p>
              </div>
              <div className="px-2 space-y-1">
                <LanguageButton />
                <ThemeButton />
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}
