import type { MutableRefObject } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Order } from '@/entities/order'
import type { Side } from '@/shared/types'
import { createOrder, getOrderStatus } from '@/entities/order'

const DEFAULT_POLL_INTERVAL_MS = 1500

export interface OrderFlowPayload {
  side: Side
  entryPrice: number
  size: number
  leverage: number
}

export interface UseOrderFlowOptions {
  pollIntervalMs?: number
  onFilledRef?: MutableRefObject<(() => void) | null>
}

export interface UseOrderFlowResult {
  order: Order | null
  error: string | null
  isOrderInProgressRef: MutableRefObject<boolean>
  startOrder: (payload: OrderFlowPayload) => Promise<void>
}

export function useOrderFlow(options: UseOrderFlowOptions = {}): UseOrderFlowResult {
  const { pollIntervalMs = DEFAULT_POLL_INTERVAL_MS, onFilledRef } = options

  const [order, setOrder] = useState<Order | null>(null)
  const [error, setError] = useState<string | null>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isOrderInProgressRef = useRef(false)

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
  }, [])

  useEffect(() => {
    return stopPolling
  }, [stopPolling])

  const startOrder = useCallback(
    async (payload: OrderFlowPayload) => {
      setError(null)
      setOrder(null)
      stopPolling()
      isOrderInProgressRef.current = false

      try {
        const { orderId } = await createOrder(payload)
        isOrderInProgressRef.current = true

        const poll = async () => {
          try {
            const status = await getOrderStatus(orderId)
            const nextOrder: Order = {
              orderId,
              status: status.status,
              filledSize: status.filledSize,
              reason: status.reason,
            }
            setOrder(nextOrder)

            const isTerminal = status.status === 'filled' || status.status === 'rejected'
            if (isTerminal) {
              isOrderInProgressRef.current = false
              stopPolling()
              if (status.status === 'filled') {
                onFilledRef?.current?.()
              }
            }
          } catch (e) {
            setError(e instanceof Error ? e.message : 'Ошибка при получении статуса')
            isOrderInProgressRef.current = false
            stopPolling()
          }
        }

        await poll()
        pollRef.current = setInterval(poll, pollIntervalMs)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Ошибка при создании ордера')
        isOrderInProgressRef.current = false
      }
    },
    [pollIntervalMs, stopPolling, onFilledRef]
  )

  return {
    order,
    error,
    isOrderInProgressRef,
    startOrder,
  }
}
