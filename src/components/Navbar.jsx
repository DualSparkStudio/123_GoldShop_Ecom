import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X, Phone, Mail, MapPin, Search, Crown } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { getCartCount } = useCart()
  const location = useLocation()
  const cartCount = getCartCount()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/products', label: 'Products' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Top Bar */}
      <div className="bg-slate-900 text-white py-1.5 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-1">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <Mail className="w-3 h-3" />
                <span>info@luxejewelry.com</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3 h-3" />
              <span className="text-xs">123 Jewelry Street, City</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar - Rounded Design */}
      <div className="bg-slate-900 py-2 md:py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`bg-white rounded-full shadow-lg transition-all duration-300 ${
              scrolled ? 'shadow-xl' : 'shadow-lg'
            }`}
          >
            <div className="px-4 md:px-6">
              <div className="flex justify-between items-center h-14 md:h-16">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                  <div className="bg-gradient-to-br from-gold-500 to-gold-600 p-1.5 md:p-2 rounded-full">
                    <Crown className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-base md:text-lg font-serif font-bold leading-tight">
                      <span className="text-slate-900">Luxe Gold & Silver</span>
                    </div>
                    <p className="text-[10px] text-slate-500">Premium Jewelry Collection</p>
                  </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`relative px-3 py-1.5 rounded-full font-semibold text-sm transition-all ${
                        isActive(link.path)
                          ? 'bg-gold-600 text-white'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                  <button className="hidden md:flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 text-slate-700 hover:text-gold-600 transition-all">
                    <Search className="w-4 h-4" />
                  </button>
                  
                  <Link to="/cart" className="relative">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 text-slate-700 hover:text-gold-600 transition-all">
                      <ShoppingCart className="w-4 h-4" />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 text-slate-700 transition-all"
                  >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden border-t border-slate-100"
                >
                  <div className="px-4 py-3 space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`block py-2 px-3 rounded-full font-semibold text-sm transition-all ${
                          isActive(link.path)
                            ? 'bg-gold-600 text-white'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        </div>
      </div>
    </>
  )
}

export default Navbar
