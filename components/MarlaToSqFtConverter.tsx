"use client";

import { useState, useCallback } from "react";
import { ArrowRightLeft, MapPin } from "lucide-react";
import { MARLA_OPTIONS, SQ_FT_PER_SQ_YD, type AreaUnit } from "@/lib/marla-types";
import { convertArea, isValidMarlaInput } from "@/lib/marla-convert";
import type { AreaConversionResult } from "@/lib/marla-types";
import { useLanguage } from "@/components/LanguageProvider";

const fieldClass =
  "w-full px-4 py-3 rounded-xl border border-soil-200 dark:border-white/10 bg-white dark:bg-soil-950 text-soil-950 dark:text-soil-100 placeholder:text-soil-400 dark:placeholder:text-soil-500 focus:border-accent dark:focus:border-accent-light transition-colors appearance-none cursor-pointer";

export default function MarlaToSqFtConverter() {
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState<string>("");
  const [sourceUnit, setSourceUnit] = useState<AreaUnit>("normal");
  const [targetUnit, setTargetUnit] = useState<AreaUnit>("sqFt");
  const [result, setResult] = useState<AreaConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const unitLabel = (unit: AreaUnit) => {
    if (unit === "sqFt") return t("calculator.squareFeetLabel");
    if (unit === "sqYd") return t("calculator.squareYardsLabel");
    return t(`marla.${unit}`);
  };

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
      setResult(convertArea(num, sourceUnit, targetUnit));
    } catch {
      setError(t("calculator.conversionFailed"));
    }
  }, [inputValue, sourceUnit, targetUnit, t]);

  const handleSwap = useCallback(() => {
    setSourceUnit(targetUnit);
    setTargetUnit(sourceUnit);
    setResult(null);
    setError(null);
  }, [sourceUnit, targetUnit]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleConvert();
  };

  const units: AreaUnit[] = [...MARLA_OPTIONS.map((opt) => opt.value), "sqFt", "sqYd"];

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="sqft-area-input"
          className="block text-sm font-medium text-soil-700 dark:text-soil-300 mb-2"
        >
          {t("calculator.areaLabelAny")}
        </label>
        <input
          id="sqft-area-input"
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
          aria-describedby={error ? "sqft-input-error" : undefined}
        />
        {error && (
          <p id="sqft-input-error" className="mt-1.5 text-sm text-rose-600 dark:text-rose-400" role="alert">
            {error}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="source-sqft"
            className="block text-sm font-medium text-soil-700 dark:text-soil-300 mb-2"
          >
            {t("calculator.from")}
          </label>
          <select
            id="source-sqft"
            value={sourceUnit}
            onChange={(e) => {
              setSourceUnit(e.target.value as AreaUnit);
              setResult(null);
              setError(null);
            }}
            className={fieldClass}
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unitLabel(unit)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="target-sqft"
            className="block text-sm font-medium text-soil-700 dark:text-soil-300 mb-2"
          >
            {t("calculator.to")}
          </label>
          <select
            id="target-sqft"
            value={targetUnit}
            onChange={(e) => {
              setTargetUnit(e.target.value as AreaUnit);
              setResult(null);
              setError(null);
            }}
            className={fieldClass}
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unitLabel(unit)}
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
          aria-label="Swap source and target units"
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
            {result.inputValue} {unitLabel(result.sourceUnit)} = {result.convertedValue.toFixed(4)} {unitLabel(result.targetUnit)}
          </p>
          {result.targetUnit !== "sqFt" && (
            <p className="mt-2 text-soil-600 dark:text-soil-300">
              {t("calculator.equivalentArea")}: {result.squareFeet.toLocaleString(undefined, { maximumFractionDigits: 4 })} {t("sqFt")}
            </p>
          )}
          {result.targetUnit !== "sqYd" && (
            <p className="mt-2 text-soil-600 dark:text-soil-300">
              {t("calculator.equivalentArea")}: {(result.squareFeet / SQ_FT_PER_SQ_YD).toLocaleString(undefined, { maximumFractionDigits: 4 })} {t("sqYd")}
            </p>
          )}
        </section>
      )}
    </div>
  );
}
