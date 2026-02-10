import { useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts'
import { useCandles } from '@/entities/candlestick'

interface ChartProps {
  symbol?: string
}

const CHART_THEME_FALLBACKS = {
  bgPrimary: '#0b0e11',
  border: '#2b3139',
  textPrimary: '#eaecef',
  green: '#0ecb81',
  red: '#f6465d',
} as const

function getChartTheme() {
  const s = getComputedStyle(document.documentElement)
  const get = (name: string, fallback: string) => s.getPropertyValue(name).trim() || fallback
  return {
    bgPrimary: get('--bg-primary', CHART_THEME_FALLBACKS.bgPrimary),
    borderColor: get('--border', CHART_THEME_FALLBACKS.border),
    textPrimary: get('--text-primary', CHART_THEME_FALLBACKS.textPrimary),
    green: get('--green', CHART_THEME_FALLBACKS.green),
    red: get('--red', CHART_THEME_FALLBACKS.red),
  }
}

export function Chart({ symbol = 'BTC/USDC' }: ChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const candles = useCandles(symbol)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const theme = getChartTheme()

    const chart = createChart(container, {
      width: container.clientWidth || 0,
      height: container.clientHeight || 400,
      layout: {
        background: { color: theme.bgPrimary },
        textColor: theme.textPrimary,
      },
      grid: {
        vertLines: { color: theme.borderColor },
        horzLines: { color: theme.borderColor },
      },
      rightPriceScale: {
        borderColor: theme.borderColor,
      },
      timeScale: {
        borderColor: theme.borderColor,
      },
    })

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: theme.green,
      borderUpColor: theme.green,
      wickUpColor: theme.green,
      downColor: theme.red,
      borderDownColor: theme.red,
      wickDownColor: theme.red,
    })

    candlestickSeries.setData(candles)

    const updateSize = () => {
      const width = container.clientWidth
      const height = container.clientHeight || 400
      if (width > 0 && height > 0) {
        chart.resize(width, height)
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    const resizeObserver = new ResizeObserver(updateSize)
    resizeObserver.observe(container)

    return () => {
      window.removeEventListener('resize', updateSize)
      resizeObserver.disconnect()
      chart.remove()
    }
  }, [candles])

  return (
    <div className="chart-container">
      <div className="chart-header">
        <span className="chart-symbol">{symbol}</span>
      </div>
      <div className="chart-placeholder" ref={containerRef} />
    </div>
  )
}
