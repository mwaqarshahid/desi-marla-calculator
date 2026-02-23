"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { CONVERSION_LINKS } from "@/lib/constants";

export { CONVERSION_LINKS };

interface QuickLinksNavProps {
  showBackLink?: boolean;
}

export default function QuickLinksNav({ showBackLink = true }: QuickLinksNavProps) {
  const { t } = useLanguage();
  return (
    <nav
      className="w-full max-w-lg mx-auto mt-6"
      aria-label={showBackLink ? "Quick conversion links and back to home" : "Quick conversion links"}
    >
      {showBackLink && (
        <p className="mb-2 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-soil-700 dark:text-soil-300 hover:text-soil-950 dark:hover:text-soil-100 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t("backToCalculator")}
          </Link>
        </p>
      )}
      <p className="text-xs font-medium text-soil-500 dark:text-soil-400 mb-2 text-center">
        {t("quickLinks")}
      </p>
      <ul className="flex flex-wrap justify-center gap-2">
        {CONVERSION_LINKS.map(({ href, labelKey }) => (
          <li key={href}>
            <Link
              href={href}
              className="inline-block px-3 py-1.5 rounded-lg text-sm text-soil-700 dark:text-soil-300 bg-soil-200/60 dark:bg-soil-700/60 hover:bg-soil-300/80 dark:hover:bg-soil-600/80 hover:text-soil-950 dark:hover:text-soil-100 transition-colors"
            >
              {t(labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
