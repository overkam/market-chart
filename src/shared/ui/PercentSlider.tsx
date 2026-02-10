import { PERCENT_OPTIONS } from '@/shared/lib'

interface PercentSliderProps {
  value: number | null
  onChange: (percent: number) => void
}

export function PercentSlider({ value, onChange }: PercentSliderProps) {
  return (
    <div className='slider'>
      {PERCENT_OPTIONS.map((percent) => (
        <button
          type="button"
          key={percent}
          className={`slider-btn ${value === percent ? 'active' : ''}`}
          onClick={() => onChange(percent)}
        >
          {percent}%
        </button>
      ))}
    </div>
  )
}
