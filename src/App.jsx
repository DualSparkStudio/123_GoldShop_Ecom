import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext'
import { OrderProvider } from './context/OrderContext'
import { MaintenanceProvider, useMaintenanceMode } from './context/MaintenanceContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Products from './pages/Products'
import Gallery from './pages/Gallery'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import About from './pages/About'
import Contact from './pages/Contact'
import Maintenance from './pages/Maintenance'

// Admin imports
import AdminLogin from './pages/admin/Login'
import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/Products'
import AdminOrders from './pages/admin/AdminOrders'
import MaintenanceSettings from './pages/admin/MaintenanceSettings'
import Profile from './pages/admin/Profile'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />
}

// Public Route with Maintenance Check
const PublicRoute = ({ children }) => {
  const { isMaintenanceMode } = useMaintenanceMode()
  const { isAuthenticated } = useAuth()
  
  // Allow admin users to bypass maintenance mode
  if (isMaintenanceMode && !isAuthenticated) {
    return <Maintenance />
  }
  
  return children
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <MaintenanceProvider>
          <ProductProvider>
            <CartProvider>
              <OrderProvider>
              <ScrollToTop />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={
                  <PublicRoute>
                    <div className="min-h-screen flex flex-col">
                      <Navbar />
                      <main className="flex-grow">
                        <Home />
                      </main>
                      <Footer />
                      <WhatsAppButton />
                    </div>
                  </PublicRoute>
                } />
              <Route path="/shop" element={
                <PublicRoute>
                  <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                      <Shop />
                    </main>
                    <Footer />
                    <WhatsAppButton />
                  </div>
                </PublicRoute>
              } />
              <Route path="/products" element={
                <PublicRoute>
                  <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                      <Products />
                    </main>
                    <Footer />
                    <WhatsAppButton />
                  </div>
                </PublicRoute>
              } />
              <Route path="/gallery" element={
                <PublicRoute>
                  <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                      <Gallery />
                    </main>
                    <Footer />
                    <WhatsAppButton />
                  </div>
                </PublicRoute>
              } />
              <Route path="/product/:id" element={
                <PublicRoute>
                  <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                      <ProductDetail />
                    </main>
                    <Footer />
                    <WhatsAppButton />
                  </div>
                </PublicRoute>
              } />
              <Route path="/cart" element={
                <PublicRoute>
                  <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                      <Cart />
                    </main>
                    <Footer />
                    <WhatsAppButton />
                  </div>
                </PublicRoute>
              } />
              <Route path="/checkout" element={
                <PublicRoute>
                  <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                      <Checkout />
                    </main>
                    <Footer />
                    <WhatsAppButton />
                  </div>
                </PublicRoute>
              } />
              <Route path="/orders" element={
                <PublicRoute>
                  <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                      <Orders />
                    </main>
                    <Footer />
                    <WhatsAppButton />
                  </div>
                </PublicRoute>
              } />
              <Route path="/about" element={
                <PublicRoute>
                  <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                      <About />
                    </main>
                    <Footer />
                    <WhatsAppButton />
                  </div>
                </PublicRoute>
              } />
              <Route path="/contact" element={
                <PublicRoute>
                  <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                      <Contact />
                    </main>
                    <Footer />
                    <WhatsAppButton />
                  </div>
                </PublicRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/admin/login" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="maintenance" element={<MaintenanceSettings />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </MaintenanceProvider>
  </AuthProvider>
</Router>
  )
}

export default App
