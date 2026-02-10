import type { Side } from '@/shared/types'
import { useState } from 'react'

interface SideTabsProps {
  value: Side
  onChange: (side: Side) => void
}

export function SideTabs({ value, onChange }: SideTabsProps) {
  const [side, setSide] = useState<Side>(value)

  const handleSideChange = (newSide: Side) => {
    setSide(newSide)
    onChange(newSide)
  }

  return (
    <div className='side-tabs'>
      <button
        type="button"
        className={`side-tab buy ${side === 'long' ? 'active' : ''}`}
        onClick={() => handleSideChange('long')}
      >
        Buy
      </button>
      <button
        type="button"
        className={`side-tab sell ${side === 'short' ? 'active' : ''}`}
        onClick={() => handleSideChange('short')}
      >
        Sell
      </button>
    </div>
  )
}
