import type { Side, OrderType, TradingPanelFormValues } from '@/shared/types'
import * as yup from 'yup'
import { LEVERAGE_OPTIONS, PERCENT_OPTIONS } from './constants'

export const tradingPanelSchema = yup.object({
  side: yup.mixed<Side>().oneOf(['long', 'short']).required(),
  orderType: yup.mixed<OrderType>().oneOf(['limit', 'market']).required(),
  price: yup
    .string()
    .required('Укажите цену')
    .test('positive', 'Цена должна быть больше 0', (value: string | undefined) => {
      const n = parseFloat(value ?? '')
      return !Number.isNaN(n) && n > 0
    }),
  size: yup
    .string()
    .required('Укажите размер')
    .test('positive', 'Размер должен быть больше 0', (value: string | undefined) => {
      const n = parseFloat(value ?? '')
      return !Number.isNaN(n) && n > 0
    }),
  percent: yup
    .number()
    .oneOf(PERCENT_OPTIONS, 'Выберите процент из списка')
    .required(),
  leverage: yup
    .number()
    .oneOf(LEVERAGE_OPTIONS, 'Выберите плечо из списка')
    .required(),
}) as yup.ObjectSchema<TradingPanelFormValues>
