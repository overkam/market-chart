export type Side = 'long' | 'short'

export type OrderType = 'limit' | 'market'

export interface PositionInput {
  side: Side
  entryPrice: number
  size: number
  leverage: number
}

export interface CalculatedValues {
  notionalValue: number
  requiredMargin: number
  maintenanceMargin: number
  liquidationPrice: number
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

/** Поля формы трейдинг-панели */
export interface TradingPanelFormValues {
  side: Side
  orderType: OrderType
  price: string
  size: string
  percent: number
  leverage: number
}
