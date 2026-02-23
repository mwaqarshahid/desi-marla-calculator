"use client";

import { useState, useCallback } from "react";
import { ArrowRightLeft, Calculator, MapPin } from "lucide-react";
import { MARLA_OPTIONS, type MarlaType } from "@/lib/marla-types";
import { convertMarla, isValidMarlaInput } from "@/lib/marla-convert";
import type { ConversionResult } from "@/lib/marla-types";
import { useLanguage } from "@/components/LanguageProvider";

interface CalculatorCardProps {
  defaultSource?: MarlaType;
  defaultTarget?: MarlaType;
}

export default function CalculatorCard({
  defaultSource = "normal",
  defaultTarget = "lahori",
}: CalculatorCardProps = {}) {
  const { t } = useLanguage();
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

  return (
    <article
      className="w-full max-w-lg mx-auto bg-white dark:bg-soil-900 rounded-2xl shadow-card hover:shadow-card-hover dark:shadow-none dark:border dark:border-soil-700 transition-all duration-300 overflow-hidden border border-soil-200/80"
      aria-label="Marla conversion calculator"
    >
      {/* Header */}
      <header className="bg-gradient-to-br from-accent to-accent-dark dark:from-accent-dark dark:to-soil-950 px-6 py-5 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
            <Calculator className="h-7 w-7 text-white" aria-hidden />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">
              DMC
            </h1>
            <p className="text-soil-200 text-sm font-medium">
              {t("calculator.desiMarlaCalculator")}
            </p>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-5">
        {/* Input */}
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
            className="w-full px-4 py-3 rounded-xl border border-soil-200 dark:border-soil-600 bg-soil-50/50 dark:bg-soil-800/50 text-soil-950 dark:text-soil-100 placeholder:text-soil-400 dark:placeholder:text-soil-500 focus:border-accent focus:bg-white dark:focus:bg-soil-800 transition-colors"
            aria-describedby={error ? "input-error" : undefined}
          />
          {error && (
            <p id="input-error" className="mt-1.5 text-sm text-amber-600 dark:text-amber-500" role="alert">
              {error}
            </p>
          )}
        </div>

        {/* Source & Target */}
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
              className="w-full px-4 py-3 rounded-xl border border-soil-200 dark:border-soil-600 bg-soil-50/50 dark:bg-soil-800/50 text-soil-950 dark:text-soil-100 focus:border-accent focus:bg-white dark:focus:bg-soil-800 transition-colors appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%23695642%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat pr-10"
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
              className="w-full px-4 py-3 rounded-xl border border-soil-200 dark:border-soil-600 bg-soil-50/50 dark:bg-soil-800/50 text-soil-950 dark:text-soil-100 focus:border-accent focus:bg-white dark:focus:bg-soil-800 transition-colors appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%23695642%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat pr-10"
            >
              {MARLA_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {marlaLabel(opt.value)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleSwap}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-soil-700 dark:text-soil-300 hover:bg-soil-200/60 dark:hover:bg-soil-600/60 hover:text-soil-950 dark:hover:text-soil-100 transition-colors focus:bg-soil-200/60 dark:focus:bg-soil-600/60"
            aria-label="Swap source and target marla types"
          >
            <ArrowRightLeft className="h-4 w-4" />
            <span className="text-sm font-medium">{t("calculator.swap")}</span>
          </button>
        </div>

        {/* Convert button */}
        <button
          type="button"
          onClick={handleConvert}
          className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-accent to-accent-dark dark:from-accent-dark dark:to-accent text-white hover:from-accent-dark hover:to-accent dark:hover:from-accent dark:hover:to-accent-light transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99]"
        >
          {t("calculator.convert")}
        </button>

        {/* Result */}
        {result && (
          <section
            className="rounded-xl bg-soil-100/80 dark:bg-soil-800/80 border border-soil-200/80 dark:border-soil-600/80 p-4 animate-slide-up"
            aria-live="polite"
          >
            <div className="flex items-center gap-2 text-soil-700 dark:text-soil-300 mb-3">
              <MapPin className="h-4 w-4 text-accent" aria-hidden />
              <span className="text-sm font-medium">{t("calculator.result")}</span>
            </div>
            <p className="text-lg font-sans font-semibold text-soil-950 dark:text-soil-100">
              {result.inputValue} {marlaLabel(result.sourceType)} = {result.convertedValue.toFixed(4)} {marlaLabel(result.targetType)}
            </p>
            <p className="mt-2 text-soil-600 dark:text-soil-400">
              {t("calculator.equivalentArea")}: {result.squareFeet.toLocaleString(undefined, { maximumFractionDigits: 4 })} {t("sqFt")}
            </p>
          </section>
        )}
      </div>
    </article>
  );
}
