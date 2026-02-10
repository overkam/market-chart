export type OrderStatus = 'pending' | 'accepted' | 'rejected' | 'filled'

export interface Order {
  orderId: string
  status: OrderStatus
  filledSize?: number
  reason?: string
}
