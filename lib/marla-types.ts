/**
 * Marla-related types and re-exports from constants.
 */

import type { MarlaType } from "./constants";

export {
  MARLA_SQ_FT,
  MARLA_LABELS,
  MARLA_OPTIONS,
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

/** Linked live-converter units: all three marla types plus square feet. */
export type AreaUnit = MarlaType | "sqFt";

export interface LinkedAreaValues {
  normal: number;
  lahori: number;
  multani: number;
  sqFt: number;
}
