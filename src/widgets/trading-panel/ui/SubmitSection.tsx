import type { Side } from '@/shared/types'
import { SubmitButton } from '@/shared/ui'

interface SubmitSectionProps {
  side: Side
  disabled: boolean
  loading: boolean
  onSubmit: () => void
}

export function SubmitSection({ side, disabled, loading, onSubmit }: SubmitSectionProps) {
  return (
    <div className="component-placeholder">
      <span>SubmitButton</span>
      <SubmitButton side={side} disabled={disabled} loading={loading} onClick={onSubmit} />
    </div>
  )
}
