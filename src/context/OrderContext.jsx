import { createContext, useContext, useState, useEffect } from 'react'

const OrderContext = createContext()

export const useOrder = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider')
  }
  return context
}

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])

  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now().toString(),
      orderNumber: `ORD-${Date.now()}`,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    setOrders(prev => [newOrder, ...prev])
    return newOrder
  }

  const updateOrderStatus = (orderId, status) => {
    console.log('updateOrderStatus called:', { orderId, status })
    setOrders(prev => {
      const updated = prev.map(order =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      )
      console.log('Updated orders:', updated)
      return updated
    })
  }

  const cancelOrder = (orderId) => {
    updateOrderStatus(orderId, 'cancelled')
  }

  const deleteOrder = (orderId) => {
    console.log('deleteOrder called:', orderId)
    setOrders(prev => {
      const filtered = prev.filter(order => order.id !== orderId)
      console.log('Filtered orders:', filtered)
      return filtered
    })
  }

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId)
  }

  const getOrdersByCustomer = (email) => {
    return orders.filter(order => order.customerInfo.email === email)
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        updateOrderStatus,
        cancelOrder,
        deleteOrder,
        getOrderById,
        getOrdersByCustomer,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
