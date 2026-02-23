/**
 * Application-wide constants.
 */

/** Square feet per 1 marla for each type (Pakistan regional definitions). */
export const MARLA_SQ_FT = {
  normal: 272.25,
  lahori: 225,
  multani: 270,
} as const;

export type MarlaType = keyof typeof MARLA_SQ_FT;

/** Display labels for each marla type. */
export const MARLA_LABELS: Record<MarlaType, string> = {
  normal: "Normal Marla",
  lahori: "Lahori Marla",
  multani: "Multani Marla",
};

/** Marla options for dropdowns. */
export const MARLA_OPTIONS: { value: MarlaType; label: string }[] = [
  { value: "normal", label: MARLA_LABELS.normal },
  { value: "lahori", label: MARLA_LABELS.lahori },
  { value: "multani", label: MARLA_LABELS.multani },
];

/** Quick conversion page links (href + translation key for label). */
export const CONVERSION_LINKS = [
  { href: "/normal-to-lahori", labelKey: "normalToLahori" as const },
  { href: "/normal-to-multani", labelKey: "normalToMultani" as const },
  { href: "/lahori-to-normal", labelKey: "lahoriToNormal" as const },
  { href: "/lahori-to-multani", labelKey: "lahoriToMultani" as const },
  { href: "/multani-to-normal", labelKey: "multaniToNormal" as const },
  { href: "/multani-to-lahori", labelKey: "multaniToLahori" as const },
] as const;

/** LocalStorage keys. */
export const STORAGE_KEYS = {
  THEME: "dmc-theme",
  LOCALE: "dmc-locale",
} as const;

/** Decimal places for conversion results. */
export const DECIMAL_PLACES = 4;

/** Default locale. */
export const DEFAULT_LOCALE = "en" as const;

/** Default theme. */
export const DEFAULT_THEME = "light" as const;

/** Valid translation keys for header subtitle. */
export const HEADER_SUBTITLE_KEYS = [
  "header.subtitle",
  "normalToLahori",
  "normalToMultani",
  "lahoriToNormal",
  "lahoriToMultani",
  "multaniToNormal",
  "multaniToLahori",
] as const;

export type SubtitleKey = (typeof HEADER_SUBTITLE_KEYS)[number];
