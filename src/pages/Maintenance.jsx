import { motion } from 'framer-motion'
import { Wrench, Clock, Mail, Phone } from 'lucide-react'

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          className="inline-block mb-8"
        >
          <div className="bg-gradient-to-br from-gold-500 to-gold-600 p-6 rounded-full">
            <Wrench className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
          Under Maintenance
        </h1>
        
        <p className="text-xl text-slate-300 mb-8">
          We're currently performing scheduled maintenance to improve your experience.
        </p>

        {/* Info Box */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-center space-x-2 text-gold-400 mb-4">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Expected Downtime</span>
          </div>
          <p className="text-white text-lg">
            We'll be back online shortly. Thank you for your patience!
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 text-slate-300">
          <p className="text-sm">Need immediate assistance?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <a href="mailto:info@luxejewelry.com" className="flex items-center space-x-2 hover:text-gold-400 transition-colors">
              <Mail className="w-4 h-4" />
              <span>info@luxejewelry.com</span>
            </a>
            <a href="tel:+15551234567" className="flex items-center space-x-2 hover:text-gold-400 transition-colors">
              <Phone className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </a>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="mt-12 flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 bg-gold-500 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Maintenance
