import type { TradingPanelFormValues } from '@/shared/types'
import {
  OrderTypeSelector,
  LeverageSlider,
  PercentSlider,
  PriceInput,
  SideTabs,
  SizeInput,
  SummaryRow,
} from '@/shared/ui'

interface TradingControlsProps {
  values: TradingPanelFormValues
  errors: FormikErrors<TradingPanelFormValues>
  touched: FormikTouched<TradingPanelFormValues>
  setFieldValue: (field: keyof TradingPanelFormValues & string, value: unknown) => void
  availableBalance: number
}

type FormikErrors<T> = { [K in keyof T]?: string }
type FormikTouched<T> = { [K in keyof T]?: boolean }

export function TradingControls({
  values,
  errors,
  touched,
  setFieldValue,
  availableBalance,
}: TradingControlsProps) {
  return (
    <>
      <div className="component-placeholder">
        <span>SideTabs</span>
        <SideTabs value={values.side} onChange={(side) => setFieldValue('side', side)} />
      </div>

      <div className="component-placeholder">
        <span>OrderTypeSelector</span>
        <OrderTypeSelector
          value={values.orderType}
          onChange={(value: 'limit' | 'market') => setFieldValue('orderType', value)}
        />
      </div>

      <div className="balance-row">
        <span>Доступно</span>
        <span>{availableBalance.toLocaleString()} USDC</span>
      </div>

      <div className="component-placeholder">
        <span>PriceInput</span>
        <PriceInput
          value={values.price}
          onChange={(value: string) => setFieldValue('price', value)}
          label="Price"
          suffix="USDC"
          placeholder="Enter price"
        />
        {touched.price && errors.price && <span className="field-error">{errors.price}</span>}
      </div>

      <div className="component-placeholder">
        <span>SizeInput</span>
        <SizeInput
          value={values.size}
          onChange={(value) => setFieldValue('size', value)}
          label="Size"
          suffix="BTC"
          placeholder="Enter size"
        />
        {touched.size && errors.size && <span className="field-error">{errors.size}</span>}
      </div>

      <div className="component-placeholder">
        <span>PercentSlider (25/50/75/100%)</span>
        <PercentSlider value={values.percent} onChange={(percent) => setFieldValue('percent', percent)} />
      </div>

      <div className="component-placeholder">
        <span>LeverageSlider (5/10/15/20)</span>
        <LeverageSlider value={values.leverage} onChange={(leverage) => setFieldValue('leverage', leverage)} />
      </div>

      <div className="summary">
        <SummaryRow
          side={values.side}
          entryPrice={parseFloat(values.price || '0')}
          size={parseFloat(values.size || '0')}
          leverage={values.leverage}
        />
      </div>
    </>
  )
}
