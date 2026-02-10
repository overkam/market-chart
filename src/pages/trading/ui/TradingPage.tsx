import { Chart } from '@/widgets/chart'
import { TradingPanel } from '@/widgets/trading-panel'

export function TradingPage() {
  return (
    <div className="app">
      <div className="main-content">
        <Chart symbol="BTC/USDC" />
      </div>
      <aside className="sidebar">
        <TradingPanel />
      </aside>
    </div>
  )
}
