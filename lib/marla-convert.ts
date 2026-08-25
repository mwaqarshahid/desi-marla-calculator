import {
  MARLA_SQ_FT,
  DECIMAL_PLACES,
  type MarlaType,
} from "./constants";
import type {
  ConversionResult,
  ConversionInput,
  AreaUnit,
  LinkedAreaValues,
} from "./marla-types";
import { roundToDecimals } from "./utils";

/**
 * Validates numeric input: must be a finite positive number.
 */
export function isValidMarlaInput(value: unknown): value is number {
  if (typeof value !== "number") return false;
  if (!Number.isFinite(value)) return false;
  if (value < 0) return false;
  if (Number.isNaN(value)) return false;
  return true;
}

/**
 * Converts marla from source type to target type using square feet as base.
 * Formula: squareFeet = inputValue × sourceMarlaInSqFt
 *          convertedValue = squareFeet ÷ targetMarlaInSqFt
 */
export function convertMarla(input: ConversionInput): ConversionResult {
  const { value, sourceType, targetType } = input;

  if (!isValidMarlaInput(value)) {
    throw new Error("Invalid input: value must be a non-negative number.");
  }

  const sourceSqFtPerMarla = MARLA_SQ_FT[sourceType];
  const targetSqFtPerMarla = MARLA_SQ_FT[targetType];

  const squareFeet = value * sourceSqFtPerMarla;
  const convertedValue =
    targetType === sourceType ? value : squareFeet / targetSqFtPerMarla;

  return {
    inputValue: value,
    sourceType,
    targetType,
    squareFeet: roundToDecimals(squareFeet, DECIMAL_PLACES),
    convertedValue: roundToDecimals(convertedValue, DECIMAL_PLACES),
  };
}

/**
 * Get square feet per marla for a given type (for display).
 */
export function getSqFtPerMarla(type: MarlaType): number {
  return MARLA_SQ_FT[type];
}

/**
 * Converts a value in any marla type or square feet into all four linked units.
 * Square feet is the shared base: marla = squareFeet ÷ sqFtPerMarla.
 */
export function convertFromAreaUnit(
  value: number,
  unit: AreaUnit
): LinkedAreaValues {
  if (!isValidMarlaInput(value)) {
    throw new Error("Invalid input: value must be a non-negative number.");
  }

  const squareFeet = unit === "sqFt" ? value : value * MARLA_SQ_FT[unit];

  return {
    sqFt: roundToDecimals(squareFeet, DECIMAL_PLACES),
    normal: roundToDecimals(squareFeet / MARLA_SQ_FT.normal, DECIMAL_PLACES),
    lahori: roundToDecimals(squareFeet / MARLA_SQ_FT.lahori, DECIMAL_PLACES),
    multani: roundToDecimals(squareFeet / MARLA_SQ_FT.multani, DECIMAL_PLACES),
  };
}
