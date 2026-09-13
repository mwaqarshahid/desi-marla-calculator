"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function PageIntro() {
  const { t } = useLanguage();

  return (
    <h1 className="mx-auto max-w-xl text-center text-xl sm:text-2xl font-display font-semibold tracking-tight text-soil-900 dark:text-white leading-snug">
      {t("intro.tagline")}
    </h1>
  );
}
