interface PriceInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
  suffix?: string
  placeholder?: string
}

export function PriceInput({ value, onChange, label, suffix, placeholder }: PriceInputProps) {
  return (
    <div className='input-field'>
      <label>{label}</label>
      <div className='input-wrapper'>
        <input type='number' value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
        <span className='input-suffix'>{suffix}</span>
      </div>
    </div>
  )
}
