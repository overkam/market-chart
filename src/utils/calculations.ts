import type { PositionInput, CalculatedValues, ValidationResult } from '@/types'

/**
 * Calculate position values based on input
 * 
 * Formulas:
 * - Notional Value = entryPrice * size
 * - Required Margin = notionalValue / leverage
 * - Maintenance Margin = notionalValue * 0.005 (0.5%)
 * - Liquidation Price:
 *   - Long: entryPrice * (1 - 1/leverage + 0.005)
 *   - Short: entryPrice * (1 + 1/leverage - 0.005)
 */
export function calculatePosition(input: PositionInput): CalculatedValues {
  throw new Error('Not implemented')
}

/**
 * Validate position input
 * 
 * Rules:
 * - leverage must be between 1 and 20
 * - requiredMargin must be greater than maintenanceMargin
 * - All fields must be filled and > 0
 */
export function validatePosition(
  input: PositionInput,
  calculated: CalculatedValues
): ValidationResult {
  throw new Error('Not implemented')
}
