"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="mt-12 text-center text-sm text-soil-500 dark:text-soil-400">
      <p>{t("footer")}</p>
    </footer>
  );
}
