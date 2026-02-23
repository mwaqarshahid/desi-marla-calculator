"use client";

import { MARLA_SQ_FT } from "@/lib/marla-types";
import type { MarlaType } from "@/lib/marla-types";
import { useLanguage } from "@/components/LanguageProvider";

export default function MarlaReference() {
  const { t } = useLanguage();
  const entries = (
    ["normal", "lahori", "multani"] as const
  ).map((key: MarlaType) => ({
    key,
    label: t(`marla.${key}`),
    sqFt: MARLA_SQ_FT[key],
  }));

  return (
    <section
      className="w-full max-w-lg mx-auto mt-8 rounded-xl bg-white/60 dark:bg-soil-800/60 border border-soil-200/80 dark:border-soil-600/80 p-4"
      aria-label="Marla reference"
    >
      <h2 className="text-sm font-semibold text-soil-700 dark:text-soil-300 mb-3">
        {t("reference.title")}
      </h2>
      <ul className="space-y-2 text-sm text-soil-600 dark:text-soil-400">
        {entries.map(({ key, label, sqFt }) => (
          <li key={key} className="flex justify-between">
            <span>{label}</span>
            <span className="font-medium text-soil-800 dark:text-soil-200">{sqFt} {t("sqFt")}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
