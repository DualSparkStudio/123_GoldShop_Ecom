import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Clock, CheckCircle, XCircle, Truck, Eye, Filter, Trash2 } from 'lucide-react'
import { useOrder } from '../../context/OrderContext'
import { format } from 'date-fns'

const AdminOrders = () => {
  const { orders, updateOrderStatus, deleteOrder } = useOrder()
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)

  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'all') return true
    return order.status === filterStatus
  })

  const handleStatusChange = (orderId, newStatus) => {
    if (window.confirm(`Change order status to ${newStatus}?`)) {
      updateOrderStatus(orderId, newStatus)
      alert('Order status updated successfully!')
    }
  }

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      deleteOrder(orderId)
      alert('Order deleted successfully!')
    }
  }

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

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    revenue: orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total + (o.total > 5000 ? 0 : 50) + o.total * 0.1, 0),
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold luxury-text mb-2">Orders</h1>
          <p className="text-slate-600">Manage customer orders</p>
        </div>
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-slate-600" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white border-2 border-slate-200 focus:border-gold-500 text-slate-800 outline-none transition-all font-semibold"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Pending</p>
              <p className="text-3xl font-bold text-slate-800">{stats.pending}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Delivered</p>
              <p className="text-3xl font-bold text-slate-800">{stats.delivered}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Revenue</p>
              <p className="text-3xl font-bold text-slate-800">${stats.revenue.toLocaleString()}</p>
            </div>
            <div className="bg-gold-100 p-3 rounded-xl">
              <Package className="w-6 h-6 text-gold-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">
                    Order #{order.orderNumber}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Placed on {format(new Date(order.createdAt), 'MMMM dd, yyyy HH:mm')}
                  </p>
                  <p className="text-slate-600 text-sm">
                    Customer: {order.customerInfo.name} ({order.customerInfo.email})
                  </p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(order.status)} mt-4 lg:mt-0`}>
                  {order.status.toUpperCase()}
                </span>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 text-sm">{item.name}</h4>
                      <p className="text-slate-600 text-xs">Qty: {item.quantity} × ${item.price.toLocaleString()}</p>
                    </div>
                    <p className="font-bold text-gold-600">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg mb-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2 text-sm">Shipping Address</h4>
                  <p className="text-slate-600 text-sm">{order.customerInfo.name}</p>
                  <p className="text-slate-600 text-sm">{order.customerInfo.address}</p>
                  <p className="text-slate-600 text-sm">
                    {order.customerInfo.city}, {order.customerInfo.state} {order.customerInfo.zipCode}
                  </p>
                  <p className="text-slate-600 text-sm mt-2">{order.customerInfo.phone}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2 text-sm">Order Total</h4>
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
                    <div className="flex justify-between font-bold text-slate-800 pt-2 border-t border-slate-200">
                      <span>Total:</span>
                      <span className="text-gold-600">
                        ${(order.total + (order.total > 5000 ? 0 : 50) + order.total * 0.1).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {order.notes && (
                <div className="p-3 bg-blue-50 rounded-lg mb-6">
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold">Customer Notes:</span> {order.notes}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {order.status === 'pending' && (
                  <button
                    onClick={() => handleStatusChange(order.id, 'processing')}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors text-sm"
                  >
                    Mark as Processing
                  </button>
                )}
                {order.status === 'processing' && (
                  <button
                    onClick={() => handleStatusChange(order.id, 'shipped')}
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors text-sm"
                  >
                    Mark as Shipped
                  </button>
                )}
                {order.status === 'shipped' && (
                  <button
                    onClick={() => handleStatusChange(order.id, 'delivered')}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors text-sm"
                  >
                    Mark as Delivered
                  </button>
                )}
                {order.status !== 'cancelled' && order.status !== 'delivered' && (
                  <button
                    onClick={() => handleStatusChange(order.id, 'cancelled')}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors text-sm"
                  >
                    Cancel Order
                  </button>
                )}
                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  className="px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors text-sm flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="card p-12 text-center">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              {filterStatus === 'all' ? 'No Orders Yet' : `No ${filterStatus} orders`}
            </h3>
            <p className="text-slate-600">
              {filterStatus === 'all'
                ? 'Orders will appear here when customers make purchases'
                : `There are no ${filterStatus} orders at the moment`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminOrders
