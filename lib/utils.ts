/**
 * Utility functions used across the application.
 */

import { STORAGE_KEYS, DEFAULT_LOCALE, DEFAULT_THEME } from "./constants";
import enTranslations from "@/locales/en.json";
import urTranslations from "@/locales/ur.json";

export type Locale = "en" | "ur";
export type Theme = "light" | "dark";

const translations: Record<Locale, Record<string, unknown>> = {
  en: enTranslations as Record<string, unknown>,
  ur: urTranslations as Record<string, unknown>,
};

/**
 * Get a nested value from an object by dot-separated path (e.g. "header.subtitle").
 */
export function getNested(
  obj: Record<string, unknown>,
  path: string
): string | undefined {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : undefined;
}

/**
 * Translate a key for the given locale. Falls back to English, then to the key itself.
 */
export function t(locale: Locale, key: string): string {
  const value = getNested(translations[locale] as Record<string, unknown>, key);
  if (value !== undefined) return value;
  const enValue = getNested(translations.en as Record<string, unknown>, key);
  return enValue ?? key;
}

/**
 * Round a number to specified decimal places (handles floating precision).
 */
export function roundToDecimals(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Get initial theme from localStorage or system preference. Client-only.
 */
export function getInitialTheme(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const stored = localStorage.getItem(STORAGE_KEYS.THEME) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return DEFAULT_THEME;
}

/**
 * Get initial locale from localStorage. Client-only.
 */
export function getInitialLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const stored = localStorage.getItem(STORAGE_KEYS.LOCALE) as Locale | null;
  if (stored === "en" || stored === "ur") return stored;
  return DEFAULT_LOCALE;
}
