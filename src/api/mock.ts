/**
 * Mock API
 */
const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

let orderCounter = 0
const orders: Record<string, { status: string; filledSize?: number; reason?: string }> = {}

export async function createOrder(data: {
  side: 'long' | 'short'
  entryPrice: number
  size: number
  leverage: number
}): Promise<{ orderId: string }> {
  await delay(500)
  
  const orderId = `ORD-${++orderCounter}`
  
  const random = Math.random()
  
  if (random < 0.1) {
    // 10% - instant rejection (risk)
    orders[orderId] = { status: 'rejected', reason: 'Insufficient margin' }
  } else if (random < 0.2) {
    // 10% — will be rejected later
    orders[orderId] = { status: 'pending' }
    setTimeout(() => {
      orders[orderId] = { status: 'rejected', reason: 'Price moved beyond limit' }
    }, 3000)
  } else {
    // 80% — will be filled
    orders[orderId] = { status: 'pending' }
    setTimeout(() => {
      orders[orderId] = { status: 'accepted' }
    }, 1500)
    setTimeout(() => {
      orders[orderId] = { status: 'filled', filledSize: data.size }
    }, 3000)
  }
  
  return { orderId }
}

export async function getOrderStatus(orderId: string): Promise<{
  status: 'pending' | 'accepted' | 'rejected' | 'filled'
  filledSize?: number
  reason?: string
}> {
  await delay(200)
  
  const order = orders[orderId]
  if (!order) {
    throw new Error('Order not found')
  }
  
  return order as {
    status: 'pending' | 'accepted' | 'rejected' | 'filled'
    filledSize?: number
    reason?: string
  }
}
