"use client";

import { MARLA_SQ_FT, SQ_FT_PER_SQ_YD } from "@/lib/marla-types";
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
    sqYd: MARLA_SQ_FT[key] / SQ_FT_PER_SQ_YD,
  }));

  return (
    <section
      className="w-full max-w-lg mx-auto mt-8 rounded-xl bg-white dark:bg-soil-900 border border-soil-200/80 dark:border-white/10 p-4"
      aria-label="Marla reference"
    >
      <h2 className="text-sm font-semibold text-soil-700 dark:text-soil-200 mb-3">
        {t("reference.title")}
      </h2>
      <ul className="space-y-2 text-sm text-soil-600 dark:text-soil-300">
        {entries.map(({ key, label, sqFt, sqYd }) => (
          <li key={key} className="flex justify-between gap-3">
            <span>{label}</span>
            <span className="font-medium text-soil-800 dark:text-white text-end">
              {sqFt} {t("sqFt")} · {sqYd} {t("sqYd")}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
