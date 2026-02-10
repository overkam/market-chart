import type { Order } from '@/entities/order'

interface OrderStatusProps {
  order: Order | null
  error: string | null
}

export function OrderStatus({ order, error }: OrderStatusProps) {
  return (
    <>
      {error && (
        <div className="order-error" role="alert">
          {error}
        </div>
      )}

      {order && (
        <div className={`order-status order-status--${order.status}`}>
          <span className="order-status-label">Ордер {order.orderId}</span>
          <span className="order-status-value">
            {order.status === 'pending' && 'Ожидание…'}
            {order.status === 'accepted' && 'Принят…'}
            {order.status === 'rejected' && (order.reason ? `Отклонён: ${order.reason}` : 'Отклонён')}
            {order.status === 'filled' && (order.filledSize != null ? `Исполнен: ${order.filledSize} BTC` : 'Исполнен')}
          </span>
        </div>
      )}
    </>
  )
}
