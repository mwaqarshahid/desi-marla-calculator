import {
  MARLA_SQ_FT,
  DECIMAL_PLACES,
  SQ_FT_PER_SQ_YD,
  type MarlaType,
} from "./constants";
import type {
  ConversionResult,
  ConversionInput,
  AreaUnit,
  AreaConversionResult,
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

function toSquareFeet(value: number, unit: AreaUnit): number {
  if (unit === "sqFt") return value;
  if (unit === "sqYd") return value * SQ_FT_PER_SQ_YD;
  return value * MARLA_SQ_FT[unit];
}

function fromSquareFeet(squareFeet: number, unit: AreaUnit): number {
  if (unit === "sqFt") return squareFeet;
  if (unit === "sqYd") return squareFeet / SQ_FT_PER_SQ_YD;
  return squareFeet / MARLA_SQ_FT[unit];
}

/**
 * Converts between marla types, square feet, and square yards.
 * Square feet is the shared base (1 sq yd = 9 sq ft).
 */
export function convertArea(
  value: number,
  sourceUnit: AreaUnit,
  targetUnit: AreaUnit
): AreaConversionResult {
  if (!isValidMarlaInput(value)) {
    throw new Error("Invalid input: value must be a non-negative number.");
  }

  const squareFeet = toSquareFeet(value, sourceUnit);
  const convertedValue = targetUnit === sourceUnit ? value : fromSquareFeet(squareFeet, targetUnit);

  return {
    inputValue: value,
    sourceUnit,
    targetUnit,
    squareFeet: roundToDecimals(squareFeet, DECIMAL_PLACES),
    convertedValue: roundToDecimals(convertedValue, DECIMAL_PLACES),
  };
}
