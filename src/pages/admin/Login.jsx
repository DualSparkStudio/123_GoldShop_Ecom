import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Mail, Crown, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState(() => {
    return localStorage.getItem('rememberedEmail') || ''
  })
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(() => {
    return localStorage.getItem('rememberMe') === 'true'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    const result = login(email, password, rememberMe)
    if (result.success) {
      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email)
        localStorage.setItem('rememberMe', 'true')
      } else {
        localStorage.removeItem('rememberedEmail')
        localStorage.removeItem('rememberMe')
      }
      navigate('/admin/dashboard')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gold-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="glass rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl mb-4 shadow-xl">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-serif font-bold luxury-text mb-2">
              Admin Portal
            </h1>
            <p className="text-slate-600">Sign in to manage your store</p>
          </div>

          {/* Demo Credentials */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-800 font-semibold mb-2">Demo Credentials:</p>
            <p className="text-xs text-blue-700">Email: admin@luxe.com</p>
            <p className="text-xs text-blue-700">Password: admin123</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6"
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-2 border-slate-200 focus:border-gold-500 text-slate-800 outline-none transition-all"
                  placeholder="admin@luxe.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-white border-2 border-slate-200 focus:border-gold-500 text-slate-800 outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-gold-600 bg-white border-slate-300 rounded focus:ring-gold-500 focus:ring-2 cursor-pointer"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-slate-700 cursor-pointer select-none"
              >
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full btn-primary"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-slate-600 hover:text-gold-600 transition-colors">
              ← Back to Store
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
