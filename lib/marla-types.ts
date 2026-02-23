/**
 * Marla-related types and re-exports from constants.
 */

export {
  MARLA_SQ_FT,
  MARLA_LABELS,
  MARLA_OPTIONS,
  type MarlaType,
} from "./constants";

export interface ConversionResult {
  convertedValue: number;
  squareFeet: number;
  sourceType: import("./constants").MarlaType;
  targetType: import("./constants").MarlaType;
  inputValue: number;
}

export interface ConversionInput {
  value: number;
  sourceType: import("./constants").MarlaType;
  targetType: import("./constants").MarlaType;
}
