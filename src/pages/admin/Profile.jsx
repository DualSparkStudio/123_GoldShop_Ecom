import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Save, Camera, Shield } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Profile = () => {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || 'Admin',
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    
    // Update user in context
    updateUser(formData)
    
    setIsEditing(false)
    setMessage({ type: 'success', text: 'Profile updated successfully!' })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  const handleChangePassword = (e) => {
    e.preventDefault()

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match!' })
      return
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters!' })
      return
    }

    // In a real app, you would verify currentPassword against the stored password
    // For now, we'll just update it
    updateUser({ ...formData, password: passwordData.newPassword })

    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    setShowPasswordChange(false)
    setMessage({ type: 'success', text: 'Password changed successfully!' })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Admin Profile</h1>
        <p className="text-slate-600">Manage your account settings and preferences</p>
      </motion.div>

      {/* Success/Error Message */}
      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-xl ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center">
                  <User className="w-16 h-16 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border-2 border-slate-200 hover:bg-slate-50 transition-colors">
                  <Camera className="w-4 h-4 text-slate-600" />
                </button>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">{user?.name}</h3>
              <p className="text-sm text-slate-600 mb-1">{user?.email}</p>
              <div className="inline-flex items-center space-x-1 bg-gold-100 text-gold-800 px-3 py-1 rounded-full text-xs font-semibold">
                <Shield className="w-3 h-3" />
                <span>{user?.role || 'Admin'}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Information Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Personal Information</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors text-sm font-semibold"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-600"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  disabled
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
                />
              </div>

              {isEditing && (
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center space-x-2 bg-gold-600 text-white py-3 rounded-lg hover:bg-gold-700 transition-colors font-semibold"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false)
                      setFormData({
                        name: user?.name || '',
                        email: user?.email || '',
                        phone: user?.phone || '',
                        role: user?.role || 'Admin',
                      })
                    }}
                    className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Password Change Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Security</h2>
              {!showPasswordChange && (
                <button
                  onClick={() => setShowPasswordChange(true)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-semibold"
                >
                  Change Password
                </button>
              )}
            </div>

            {showPasswordChange ? (
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gold-600 text-white py-3 rounded-lg hover:bg-gold-700 transition-colors font-semibold"
                  >
                    Update Password
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordChange(false)
                      setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                      })
                    }}
                    className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-slate-600 text-sm">
                Keep your account secure by using a strong password and changing it regularly.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile
