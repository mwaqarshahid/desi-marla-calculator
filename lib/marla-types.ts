/**
 * Marla-related types and re-exports from constants.
 */

import type { MarlaType } from "./constants";

export {
  MARLA_SQ_FT,
  MARLA_LABELS,
  MARLA_OPTIONS,
  SQ_FT_PER_SQ_YD,
  type MarlaType,
} from "./constants";

export interface ConversionResult {
  convertedValue: number;
  squareFeet: number;
  sourceType: MarlaType;
  targetType: MarlaType;
  inputValue: number;
}

export interface ConversionInput {
  value: number;
  sourceType: MarlaType;
  targetType: MarlaType;
}

/** Marla types plus square feet and square yards, used by the Marla to Square Feet tab. */
export type AreaUnit = MarlaType | "sqFt" | "sqYd";

export interface AreaConversionResult {
  inputValue: number;
  sourceUnit: AreaUnit;
  targetUnit: AreaUnit;
  squareFeet: number;
  convertedValue: number;
}
