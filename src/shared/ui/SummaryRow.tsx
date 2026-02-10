import type { PositionInput } from '@/shared/types'
import { calculatePosition, validatePosition } from '@/shared/lib'

type SummaryRowProps = PositionInput

export function SummaryRow(input: SummaryRowProps) {
  const calculated = calculatePosition(input)
  const validationResult = validatePosition(input, calculated)

  if (!validationResult.isValid) {
    return (
      <div className='summary-row'>
        <span>Стоимость ордера</span>
        <span>— USDC</span>
      </div>
    )
  }
  return (
    <div className='summary-row'>
      <span>Стоимость ордера</span>
      <span>{calculated.liquidationPrice.toLocaleString()} USDC</span>
    </div>
  )
}
