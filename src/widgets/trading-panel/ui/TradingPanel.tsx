import { useRef, useState } from 'react'
import type { TradingPanelFormValues } from '@/shared/types'
import { LEVERAGE_OPTIONS, PERCENT_OPTIONS, tradingPanelSchema } from '@/shared/lib'
import { POLL_INTERVAL_MS } from '@/shared/lib/constants'
import { Formik, type FormikConfig, type FormikProps } from 'formik'

import { useOrderFlow } from '../model/useOrderFlow'
import { OrderStatus } from './OrderStatus'
import { TradingControls } from './TradingControls'
import { SubmitSection } from './SubmitSection'

const initialValues: TradingPanelFormValues = {
  side: 'long',
  orderType: 'limit',
  price: '',
  size: '',
  percent: PERCENT_OPTIONS[0],
  leverage: LEVERAGE_OPTIONS[0],
}

export function TradingPanel() {
  const availableBalance = 10000 // USDC (mock)
  const resetFormRef = useRef<(() => void) | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    order,
    error: orderError,
    isOrderInProgressRef,
    startOrder,
  } = useOrderFlow({
    pollIntervalMs: POLL_INTERVAL_MS,
    onFilledRef: resetFormRef,
  })

  const formikConfig: FormikConfig<TradingPanelFormValues> = {
    initialValues,
    validationSchema: tradingPanelSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values: TradingPanelFormValues) => {
      setSubmitError(null)
      const entryPrice = parseFloat(values.price)
      const size = parseFloat(values.size)
      if (Number.isNaN(entryPrice) || Number.isNaN(size)) {
        setSubmitError('Некорректная цена или размер')
        return
      }

      await startOrder({
        side: values.side,
        entryPrice,
        size,
        leverage: values.leverage,
      })
    },
  }

  const displayError = submitError ?? orderError

  return (
    <Formik<TradingPanelFormValues> {...formikConfig}>
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
        isSubmitting,
        resetForm,
      }: FormikProps<TradingPanelFormValues>) => {
        resetFormRef.current = () => resetForm()
        return (
          <form className="trading-panel" onSubmit={handleSubmit} noValidate>
            <div className="panel-header">
              <h2>Трейдинг</h2>
            </div>

            <OrderStatus order={order} error={displayError} />

            <TradingControls
              values={values}
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
              availableBalance={availableBalance}
            />

            <SubmitSection
              side={values.side}
              disabled={isSubmitting || isOrderInProgressRef.current}
              loading={isSubmitting}
              onSubmit={() => handleSubmit()}
            />
          </form>
        )
      }}
    </Formik>
  )
}
