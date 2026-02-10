import type { Candlestick } from './types'
import { candlestickData } from './data'
import { useEffect, useState } from 'react'

export function useCandles(symbol: string): Candlestick[] {
  const [candles, setCandles] = useState<Candlestick[]>([])

  useEffect(() => {
    setCandles(candlestickData)
  }, [symbol])

  return candles
}
