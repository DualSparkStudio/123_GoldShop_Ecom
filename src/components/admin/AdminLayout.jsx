import { useState } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag,
  Wrench,
  User,
  LogOut,
  Menu,
  X,
  Crown,
  ChevronRight
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  // Check if mobile on mount and resize
  useState(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Products', icon: Package },
    { path: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { path: '/admin/maintenance', label: 'Maintenance', icon: Wrench },
    { path: '/admin/profile', label: 'Profile', icon: User },
  ]

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-white border-r border-slate-200 transition-all duration-300 z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${sidebarOpen ? 'w-64' : 'w-0 lg:w-20'}`}>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo */}
          <div className="p-4 lg:p-6 border-b border-slate-200 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="gradient-gold p-2 rounded-lg flex-shrink-0">
                <Crown className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              {sidebarOpen && (
                <div className="min-w-0">
                  <span className="text-lg lg:text-xl font-serif font-bold luxury-text block truncate">
                    Luxe Admin
                  </span>
                  <span className="text-[10px] lg:text-xs text-slate-500 truncate block">Management Portal</span>
                </div>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-3 lg:p-4 space-y-1 lg:space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => isMobile && setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl transition-all text-sm lg:text-base ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <item.icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="font-semibold flex-1 truncate">{item.label}</span>
                    {isActive(item.path) && <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />}
                  </>
                )}
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-3 lg:p-4 border-t border-slate-200 flex-shrink-0">
            {sidebarOpen && (
              <div className="mb-3 lg:mb-4 p-2 lg:p-3 bg-slate-50 rounded-xl">
                <p className="font-semibold text-slate-800 text-xs lg:text-sm truncate">{user?.name}</p>
                <p className="text-[10px] lg:text-xs text-slate-600 truncate">{user?.email}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all w-full text-sm lg:text-base"
            >
              <LogOut className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-semibold truncate">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen && !isMobile ? 'ml-64' : 'ml-0 lg:ml-20'}`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-8 py-3 lg:py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5 lg:w-6 lg:h-6" /> : <Menu className="w-5 h-5 lg:w-6 lg:h-6" />}
            </button>

            <div className="flex items-center space-x-3 lg:space-x-4">
              <Link
                to="/"
                className="text-xs lg:text-sm text-slate-600 hover:text-gold-600 font-semibold transition-colors"
              >
                View Store →
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
