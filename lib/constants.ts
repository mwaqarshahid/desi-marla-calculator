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

/** Square feet in 1 square yard. */
export const SQ_FT_PER_SQ_YD = 9;

/** Display labels for each marla type. */
export const MARLA_LABELS: Record<MarlaType, string> = {
  normal: "Standard Marla",
  lahori: "Lahori Marla",
  multani: "Multani Marla",
};

/** Marla options for dropdowns. */
export const MARLA_OPTIONS: { value: MarlaType; label: string }[] = [
  { value: "normal", label: MARLA_LABELS.normal },
  { value: "lahori", label: MARLA_LABELS.lahori },
  { value: "multani", label: MARLA_LABELS.multani },
];

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
