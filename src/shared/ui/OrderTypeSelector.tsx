import type { OrderType } from '@/shared/types'
import { useState } from 'react'

interface OrderTypeSelectorProps {
  value: OrderType
  onChange: (type: OrderType) => void
}

export function OrderTypeSelector({ value, onChange }: OrderTypeSelectorProps) {
  const [orderType, setOrderType] = useState<OrderType>(value)

  const handleOrderTypeChange = (newOrderType: OrderType) => {
    setOrderType(newOrderType)
    onChange(newOrderType)
  }

  return (
    <div className="order-types">
      <button
        type="button"
        className={`order-type ${orderType === 'limit' ? 'active' : ''}`}
        onClick={() => handleOrderTypeChange('limit')}
      >
        Limit
      </button>
      <button
        type="button"
        className={`order-type ${orderType === 'market' ? 'active' : ''}`}
        onClick={() => handleOrderTypeChange('market')}
      >
        Market
      </button>
    </div>
  )
}

