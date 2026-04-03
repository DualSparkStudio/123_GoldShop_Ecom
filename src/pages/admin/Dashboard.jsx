import { motion } from 'framer-motion'
import { 
  ShoppingBag, 
  DollarSign, 
  Users, 
  TrendingUp,
  Package,
  CheckCircle
} from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useProducts } from '../../context/ProductContext'
import { useOrder } from '../../context/OrderContext'

const Dashboard = () => {
  const { cart } = useCart()
  const { products } = useProducts()
  const { orders } = useOrder()

  const stats = [
    {
      title: 'Total Revenue',
      value: '$124,500',
      change: '+12.5%',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Total Products',
      value: products.length,
      change: '+3 new',
      icon: Package,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Total Orders',
      value: orders.length,
      change: '+8 today',
      icon: ShoppingBag,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Active Customers',
      value: '156',
      change: '+12 this week',
      icon: Users,
      color: 'from-orange-500 to-orange-600',
    },
  ]

  const recentOrders = orders.slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold luxury-text mb-2">
          Dashboard
        </h1>
        <p className="text-sm md:text-base text-slate-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6 hover-lift"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-600 text-sm font-semibold flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                {stat.change}
              </span>
            </div>
            <h3 className="text-slate-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="card p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-800">Recent Orders</h2>
          <button className="text-gold-600 hover:text-gold-700 font-semibold text-sm">
            View All →
          </button>
        </div>

        {recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Order #{order.orderNumber}</h3>
                    <p className="text-sm text-slate-600">{order.customerInfo.name}</p>
                    <p className="text-xs text-slate-500">{order.customerInfo.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gold-600">${order.total.toLocaleString()}</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-700'
                      : order.status === 'delivered'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status === 'delivered' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No orders yet</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="card p-6 text-left hover-lift"
        >
          <Package className="w-8 h-8 text-gold-600 mb-4" />
          <h3 className="font-bold text-lg text-slate-800 mb-2">Add Product</h3>
          <p className="text-slate-600 text-sm">Add new jewelry to your collection</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="card p-6 text-left hover-lift"
        >
          <Users className="w-8 h-8 text-gold-600 mb-4" />
          <h3 className="font-bold text-lg text-slate-800 mb-2">Manage Customers</h3>
          <p className="text-slate-600 text-sm">View and manage customer data</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="card p-6 text-left hover-lift"
        >
          <TrendingUp className="w-8 h-8 text-gold-600 mb-4" />
          <h3 className="font-bold text-lg text-slate-800 mb-2">View Reports</h3>
          <p className="text-slate-600 text-sm">Analyze sales and performance</p>
        </motion.button>
      </div>
    </div>
  )
}

export default Dashboard
