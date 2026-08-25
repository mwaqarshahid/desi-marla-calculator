"use client";

import { useState } from "react";
import { MARLA_SQ_FT, DECIMAL_PLACES, type MarlaType } from "@/lib/constants";
import type { AreaUnit } from "@/lib/marla-types";
import { convertFromAreaUnit, isValidMarlaInput } from "@/lib/marla-convert";
import { useLanguage } from "@/components/LanguageProvider";

const EMPTY_VALUES: Record<AreaUnit, string> = {
  normal: "",
  lahori: "",
  multani: "",
  sqFt: "",
};

const MARLA_FIELDS: MarlaType[] = ["normal", "lahori", "multani"];

const inputClass =
  "w-full px-4 py-3 rounded-xl border bg-white dark:bg-soil-950 text-soil-950 dark:text-soil-100 placeholder:text-soil-400 dark:placeholder:text-soil-500 focus:border-accent dark:focus:border-accent-light transition-colors";

export default function MarlaToSqFtConverter() {
  const { t } = useLanguage();
  const [values, setValues] = useState<Record<AreaUnit, string>>(EMPTY_VALUES);
  const [edited, setEdited] = useState<AreaUnit | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (unit: AreaUnit, raw: string) => {
    setEdited(unit);

    if (raw.trim() === "") {
      setValues(EMPTY_VALUES);
      setError(null);
      return;
    }

    const num = parseFloat(raw.replace(/,/g, "."));
    if (Number.isNaN(num)) {
      setValues((prev) => ({ ...prev, [unit]: raw }));
      setError(t("calculator.pleaseEnterValid"));
      return;
    }
    if (!isValidMarlaInput(num)) {
      setValues((prev) => ({ ...prev, [unit]: raw }));
      setError(t("calculator.pleaseEnterNonNegative"));
      return;
    }

    try {
      const converted = convertFromAreaUnit(num, unit);
      setValues({
        normal: unit === "normal" ? raw : converted.normal.toFixed(DECIMAL_PLACES),
        lahori: unit === "lahori" ? raw : converted.lahori.toFixed(DECIMAL_PLACES),
        multani: unit === "multani" ? raw : converted.multani.toFixed(DECIMAL_PLACES),
        sqFt: unit === "sqFt" ? raw : converted.sqFt.toFixed(DECIMAL_PLACES),
      });
      setError(null);
    } catch {
      setError(t("calculator.conversionFailed"));
    }
  };

  const fieldClass = (unit: AreaUnit, featured = false) =>
    `${inputClass} ${
      edited === unit
        ? "border-accent dark:border-accent-light"
        : featured
          ? "border-accent/30 dark:border-accent-light/30"
          : "border-soil-200 dark:border-white/10"
    }`;

  return (
    <div className="space-y-4">
      <p className="text-sm text-soil-600 dark:text-soil-300">
        {t("calculator.liveConvertHint")}
      </p>

      <div className="space-y-4">
        {MARLA_FIELDS.map((type) => (
          <div key={type}>
            <label
              htmlFor={`area-${type}`}
              className="block text-sm font-medium text-soil-700 dark:text-soil-200 mb-1"
            >
              {t(`marla.${type}`)}
            </label>
            <p className="text-xs text-soil-500 dark:text-soil-400 mb-2">
              1 {t(`marla.${type}`)} = {MARLA_SQ_FT[type]} {t("sqFt")}
            </p>
            <input
              id={`area-${type}`}
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              placeholder="0"
              value={values[type]}
              onChange={(e) => handleChange(type, e.target.value)}
              className={fieldClass(type)}
              aria-describedby={error ? "sqft-input-error" : undefined}
            />
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-accent/5 dark:bg-accent/10 border border-accent/20 dark:border-accent-light/20 p-4">
        <label
          htmlFor="area-sqft"
          className="block text-sm font-semibold text-accent dark:text-accent-light mb-2"
        >
          {t("calculator.squareFeetLabel")}
        </label>
        <input
          id="area-sqft"
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          placeholder="0"
          value={values.sqFt}
          onChange={(e) => handleChange("sqFt", e.target.value)}
          className={fieldClass("sqFt", true)}
          aria-describedby={error ? "sqft-input-error" : undefined}
        />
      </div>

      {error && (
        <p
          id="sqft-input-error"
          className="text-sm text-rose-600 dark:text-rose-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
