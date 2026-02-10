import type { Side } from '@/shared/types'

interface SubmitButtonProps {
  side: Side
  disabled?: boolean
  loading?: boolean
  onClick: () => void
}

export function SubmitButton({ side, disabled, loading, onClick }: SubmitButtonProps) {
  return (
    <button
      type="button"
      className={`submit-btn ${side === 'long' ? 'buy' : 'sell'}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {side === 'long' ? 'Купить BTC' : 'Продать BTC'}
      {loading && <span className='spinner' />}
    </button>
  )
}
