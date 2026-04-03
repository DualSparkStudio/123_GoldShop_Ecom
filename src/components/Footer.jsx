import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, Clock } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-serif text-2xl font-bold mb-4">
              Luxe <span className="text-gold-400">Jewelry</span>
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Your trusted destination for premium gold and silver jewelry since 1970. 
              Quality craftsmanship, timeless designs.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-slate-800 hover:bg-gold-600 p-2 rounded-full transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-slate-800 hover:bg-gold-600 p-2 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-slate-800 hover:bg-gold-600 p-2 rounded-full transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-slate-800 hover:bg-gold-600 p-2 rounded-full transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Home</Link></li>
              <li><Link to="/shop" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Shop</Link></li>
              <li><Link to="/bookings" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">My Bookings</Link></li>
              <li><Link to="/about" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop?category=gold" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Gold Jewelry</Link></li>
              <li><Link to="/shop?category=silver" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Silver Jewelry</Link></li>
              <li><Link to="/shop?type=necklace" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Necklaces</Link></li>
              <li><Link to="/shop?type=ring" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Rings</Link></li>
              <li><Link to="/shop?type=earrings" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Earrings</Link></li>
              <li><Link to="/shop?type=bangles" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Bangles</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-gold-400" />
                <span>123 Jewelry Street, Gold District, City 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-gold-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-gold-400" />
                <span>info@luxejewelry.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0 text-gold-400" />
                <div>
                  <p>Mon - Sat: 10:00 AM - 8:00 PM</p>
                  <p>Sunday: 11:00 AM - 6:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-center md:text-left">
              <p className="mb-1">
                &copy; {new Date().getFullYear()} Luxe Jewelry. All rights reserved.
              </p>
              <p className="text-slate-500 text-xs">
                Designed & Developed by{' '}
                <a 
                  href="https://dualsparkstudio.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gold-400 font-semibold hover:text-gold-300 transition-colors underline decoration-dotted"
                >
                  DualSpark Studio
                </a>
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link to="/privacy" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Terms & Conditions</Link>
              <Link to="/shipping" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Shipping Policy</Link>
              <Link to="/returns" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Return Policy</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-slate-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">We Accept:</p>
            <div className="flex items-center gap-4 text-slate-400 text-sm">
              <span className="bg-slate-800 px-3 py-1 rounded">Visa</span>
              <span className="bg-slate-800 px-3 py-1 rounded">Mastercard</span>
              <span className="bg-slate-800 px-3 py-1 rounded">PayPal</span>
              <span className="bg-slate-800 px-3 py-1 rounded">Amex</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
