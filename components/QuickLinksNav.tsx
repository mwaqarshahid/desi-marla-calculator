"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Ruler } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { CONVERSION_LINKS } from "@/lib/constants";
import { useCalculatorTab } from "@/components/CalculatorTabProvider";

export { CONVERSION_LINKS };

interface QuickLinksNavProps {
  showBackLink?: boolean;
}

export default function QuickLinksNav({ showBackLink = true }: QuickLinksNavProps) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const { tab, setTab } = useCalculatorTab();

  const openSqFt = () => {
    setTab("sqft");
    document.getElementById("dmc-calculator")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className="w-full max-w-lg mx-auto mt-6 space-y-5"
      aria-label={showBackLink ? "Quick conversion links and back to home" : "Quick conversion links"}
    >
      {showBackLink && (
        <p className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-soil-600 dark:text-soil-300 hover:text-accent dark:hover:text-accent-light transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t("backToCalculator")}
          </Link>
        </p>
      )}

      <button
        type="button"
        onClick={openSqFt}
        aria-pressed={tab === "sqft"}
        className={`group w-full text-start flex items-start gap-3 rounded-2xl border p-4 transition-colors ${
          tab === "sqft"
            ? "border-accent bg-accent/10 dark:border-accent-light/40 dark:bg-accent/15"
            : "border-soil-200 dark:border-white/10 bg-white dark:bg-soil-900 hover:border-accent/50 dark:hover:border-accent-light/30"
        }`}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white dark:bg-accent-dark">
          <Ruler className="h-5 w-5" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold uppercase tracking-wider text-accent dark:text-accent-light">
            {t("openSqFtConverter")}
          </span>
          <span className="mt-0.5 block text-base font-semibold text-soil-950 dark:text-white">
            {t("calculator.tabSqFt")}
          </span>
          <span className="mt-1 block text-sm text-soil-600 dark:text-soil-300">
            {t("calculator.liveConvertHint")}
          </span>
        </span>
      </button>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-soil-500 dark:text-soil-400 mb-2 text-center">
          {t("marlaConversions")}
        </p>
        <ul className="flex flex-wrap justify-center gap-2">
          {CONVERSION_LINKS.map(({ href, labelKey }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setTab("marla")}
                  className={`inline-block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    active
                      ? "bg-accent text-white dark:bg-accent-dark"
                      : "text-soil-700 dark:text-soil-200 bg-soil-100 dark:bg-soil-800 hover:bg-soil-200 dark:hover:bg-soil-700 hover:text-soil-950 dark:hover:text-white"
                  }`}
                >
                  {t(labelKey)}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
