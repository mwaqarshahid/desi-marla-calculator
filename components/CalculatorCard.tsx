"use client";

import { useState, useCallback } from "react";
import { ArrowRightLeft, MapPin } from "lucide-react";
import { MARLA_OPTIONS, type MarlaType } from "@/lib/marla-types";
import { convertMarla, isValidMarlaInput } from "@/lib/marla-convert";
import type { ConversionResult } from "@/lib/marla-types";
import { useLanguage } from "@/components/LanguageProvider";
import MarlaToSqFtConverter from "@/components/MarlaToSqFtConverter";
import { useCalculatorTab } from "@/components/CalculatorTabProvider";

interface CalculatorCardProps {
  defaultSource?: MarlaType;
  defaultTarget?: MarlaType;
}

const fieldClass =
  "w-full px-4 py-3 rounded-xl border border-soil-200 dark:border-white/10 bg-white dark:bg-soil-950 text-soil-950 dark:text-soil-100 placeholder:text-soil-400 dark:placeholder:text-soil-500 focus:border-accent dark:focus:border-accent-light transition-colors appearance-none cursor-pointer";

export default function CalculatorCard({
  defaultSource = "normal",
  defaultTarget = "lahori",
}: CalculatorCardProps = {}) {
  const { t } = useLanguage();
  const { tab, setTab } = useCalculatorTab();
  const [inputValue, setInputValue] = useState<string>("");
  const [sourceType, setSourceType] = useState<MarlaType>(defaultSource);
  const [targetType, setTargetType] = useState<MarlaType>(defaultTarget);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = useCallback(() => {
    setError(null);
    setResult(null);

    const num = parseFloat(inputValue.replace(/,/g, "."));
    if (inputValue.trim() === "" || Number.isNaN(num)) {
      setError(t("calculator.pleaseEnterValid"));
      return;
    }
    if (!isValidMarlaInput(num)) {
      setError(t("calculator.pleaseEnterNonNegative"));
      return;
    }

    try {
      const res = convertMarla({
        value: num,
        sourceType,
        targetType,
      });
      setResult(res);
    } catch {
      setError(t("calculator.conversionFailed"));
    }
  }, [inputValue, sourceType, targetType, t]);

  const handleSwap = useCallback(() => {
    setSourceType(targetType);
    setTargetType(sourceType);
    setResult(null);
    setError(null);
  }, [sourceType, targetType]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleConvert();
  };

  const marlaLabel = (type: MarlaType) => t(`marla.${type}`);

  const tabClass = (active: boolean) =>
    `flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
      active
        ? "bg-white dark:bg-soil-800 text-accent dark:text-accent-light shadow-sm"
        : "text-soil-600 dark:text-soil-300 hover:text-soil-950 dark:hover:text-white"
    }`;

  return (
    <article
      className="w-full max-w-lg mx-auto bg-white dark:bg-soil-900 rounded-2xl shadow-card hover:shadow-card-hover dark:shadow-card-dark transition-all duration-300 overflow-hidden border border-soil-200/80 dark:border-white/10"
      aria-label="Marla conversion calculator"
      id="dmc-calculator"
    >
      <div className="px-6 pt-5 pb-4">
        <div
          role="tablist"
          aria-label="Calculator modes"
          className="flex gap-1 p-1 rounded-xl bg-soil-100 dark:bg-soil-950"
        >
          <button
            id="tab-marla"
            type="button"
            role="tab"
            aria-selected={tab === "marla"}
            aria-controls="panel-marla"
            tabIndex={tab === "marla" ? 0 : -1}
            onClick={() => setTab("marla")}
            className={tabClass(tab === "marla")}
          >
            {t("calculator.tabMarla")}
          </button>
          <button
            id="tab-sqft"
            type="button"
            role="tab"
            aria-selected={tab === "sqft"}
            aria-controls="panel-sqft"
            tabIndex={tab === "sqft" ? 0 : -1}
            onClick={() => setTab("sqft")}
            className={tabClass(tab === "sqft")}
          >
            {t("calculator.tabSqFt")}
          </button>
        </div>
      </div>

      {tab === "sqft" ? (
        <div id="panel-sqft" role="tabpanel" aria-labelledby="tab-sqft" className="px-6 pb-6">
          <MarlaToSqFtConverter />
        </div>
      ) : (
        <div id="panel-marla" role="tabpanel" aria-labelledby="tab-marla" className="px-6 pb-6 space-y-5">
          <div>
            <label
              htmlFor="marla-input"
              className="block text-sm font-medium text-soil-700 dark:text-soil-300 mb-2"
            >
              {t("calculator.areaLabel")}
            </label>
            <input
              id="marla-input"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              placeholder="e.g. 5"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setResult(null);
                setError(null);
              }}
              onKeyDown={handleKeyDown}
              className={`${fieldClass} cursor-text`}
              aria-describedby={error ? "input-error" : undefined}
            />
            {error && (
              <p id="input-error" className="mt-1.5 text-sm text-rose-600 dark:text-rose-400" role="alert">
                {error}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="source-marla"
                className="block text-sm font-medium text-soil-700 dark:text-soil-300 mb-2"
              >
                {t("calculator.from")}
              </label>
              <select
                id="source-marla"
                value={sourceType}
                onChange={(e) => {
                  setSourceType(e.target.value as MarlaType);
                  setResult(null);
                  setError(null);
                }}
                className={fieldClass}
              >
                {MARLA_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {marlaLabel(opt.value)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="target-marla"
                className="block text-sm font-medium text-soil-700 dark:text-soil-300 mb-2"
              >
                {t("calculator.to")}
              </label>
              <select
                id="target-marla"
                value={targetType}
                onChange={(e) => {
                  setTargetType(e.target.value as MarlaType);
                  setResult(null);
                  setError(null);
                }}
                className={fieldClass}
              >
                {MARLA_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {marlaLabel(opt.value)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSwap}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-soil-600 dark:text-soil-300 hover:bg-soil-100 dark:hover:bg-soil-800 hover:text-soil-950 dark:hover:text-white transition-colors"
              aria-label="Swap source and target marla types"
            >
              <ArrowRightLeft className="h-4 w-4" />
              <span className="text-sm font-medium">{t("calculator.swap")}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleConvert}
            className="w-full py-3.5 rounded-xl font-semibold bg-accent hover:bg-accent-dark dark:bg-accent dark:hover:bg-accent-light dark:hover:text-soil-950 text-white transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99]"
          >
            {t("calculator.convert")}
          </button>

          {result && (
            <section
              className="rounded-xl bg-accent/5 dark:bg-accent/10 border border-accent/20 dark:border-accent-light/20 p-4 animate-slide-up"
              aria-live="polite"
            >
              <div className="flex items-center gap-2 text-soil-600 dark:text-soil-300 mb-3">
                <MapPin className="h-4 w-4 text-accent dark:text-accent-light" aria-hidden />
                <span className="text-sm font-medium">{t("calculator.result")}</span>
              </div>
              <p className="text-lg font-sans font-semibold text-soil-950 dark:text-white">
                {result.inputValue} {marlaLabel(result.sourceType)} = {result.convertedValue.toFixed(4)} {marlaLabel(result.targetType)}
              </p>
              <p className="mt-2 text-soil-600 dark:text-soil-300">
                {t("calculator.equivalentArea")}: {result.squareFeet.toLocaleString(undefined, { maximumFractionDigits: 4 })} {t("sqFt")}
              </p>
            </section>
          )}
        </div>
      )}
    </article>
  );
}
