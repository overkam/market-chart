import { LEVERAGE_OPTIONS } from '@/shared/lib'

interface LeverageSliderProps {
  value: number | null
  onChange: (leverage: number) => void
}

export function LeverageSlider({ value, onChange }: LeverageSliderProps) {
  return (
    <div className='slider'>
      {LEVERAGE_OPTIONS.map((leverage) => (
        <button
          type="button"
          key={leverage}
          className={`slider-btn ${value === leverage ? 'active' : ''}`}
          onClick={() => onChange(leverage)}
        >
          {leverage}x
        </button>
      ))}
    </div>
  )
}
