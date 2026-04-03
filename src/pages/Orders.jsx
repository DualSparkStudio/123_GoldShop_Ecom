import { motion } from 'framer-motion'
import { Package, Clock, CheckCircle, XCircle, Truck, ShoppingBag, Home } from 'lucide-react'
import { useOrder } from '../context/OrderContext'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { useState } from 'react'

const Orders = () => {
  const { orders } = useOrder()
  const navigate = useNavigate()
  const [selectedOrder, setSelectedOrder] = useState(null)

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'processing':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'shipped':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5" />
      case 'processing':
        return <Package className="w-5 h-5" />
      case 'shipped':
        return <Truck className="w-5 h-5" />
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />
      case 'cancelled':
        return <XCircle className="w-5 h-5" />
      default:
        return <Package className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-serif font-bold luxury-text mb-2">My Orders</h1>
            <p className="text-slate-600">Track and manage your orders</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <button
              onClick={() => navigate('/shop')}
              className="flex items-center space-x-2 px-6 py-3 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors font-semibold"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </motion.div>

        {orders.length === 0 ? (
          <div className="card p-12 text-center">
            <Package className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No Orders Yet</h2>
            <p className="text-slate-600 mb-6">Start shopping to place your first order</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
              >
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="flex items-center space-x-2 px-6 py-3 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors font-semibold"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Browse Products</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">
                      Order #{order.orderNumber}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Placed on {format(new Date(order.createdAt), 'MMMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold border flex items-center space-x-2 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span>{order.status.toUpperCase()}</span>
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800">{item.name}</h4>
                        <p className="text-slate-600 text-sm">Quantity: {item.quantity}</p>
                        <p className="text-slate-600 text-sm">{item.category} • {item.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gold-600 text-lg">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-slate-600 text-sm">
                          ${item.price.toLocaleString()} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Shipping Address</h4>
                    <p className="text-slate-600 text-sm">{order.customerInfo.name}</p>
                    <p className="text-slate-600 text-sm">{order.customerInfo.address}</p>
                    <p className="text-slate-600 text-sm">
                      {order.customerInfo.city}, {order.customerInfo.state} {order.customerInfo.zipCode}
                    </p>
                    <p className="text-slate-600 text-sm mt-2">{order.customerInfo.phone}</p>
                    <p className="text-slate-600 text-sm">{order.customerInfo.email}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Order Total</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-600 text-sm">
                        <span>Subtotal:</span>
                        <span>${order.total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-600 text-sm">
                        <span>Shipping:</span>
                        <span>{order.total > 5000 ? 'FREE' : '$50'}</span>
                      </div>
                      <div className="flex justify-between text-slate-600 text-sm">
                        <span>Tax:</span>
                        <span>${(order.total * 0.1).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold text-slate-800 text-lg pt-2 border-t border-slate-200">
                        <span>Total:</span>
                        <span className="text-gold-600">
                          ${(order.total + (order.total > 5000 ? 0 : 50) + order.total * 0.1).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    {order.paymentInfo && (
                      <p className="text-slate-600 text-sm mt-3">
                        Payment ID: {order.paymentInfo.paymentId}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
