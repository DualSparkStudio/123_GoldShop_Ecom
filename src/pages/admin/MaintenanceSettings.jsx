import { motion } from 'framer-motion'
import { Wrench, AlertTriangle, CheckCircle } from 'lucide-react'
import { useMaintenanceMode } from '../../context/MaintenanceContext'

const MaintenanceSettings = () => {
  const { isMaintenanceMode, toggleMaintenanceMode } = useMaintenanceMode()

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Maintenance Mode</h1>
        <p className="text-slate-600">Control site availability for customers</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
      >
        {/* Status Card */}
        <div className={`mb-8 p-6 rounded-xl border-2 ${
          isMaintenanceMode
            ? 'bg-orange-50 border-orange-200'
            : 'bg-green-50 border-green-200'
        }`}>
          <div className="flex items-center space-x-4">
            {isMaintenanceMode ? (
              <AlertTriangle className="w-12 h-12 text-orange-600" />
            ) : (
              <CheckCircle className="w-12 h-12 text-green-600" />
            )}
            <div className="flex-1">
              <h3 className={`text-xl font-bold mb-1 ${
                isMaintenanceMode ? 'text-orange-800' : 'text-green-800'
              }`}>
                {isMaintenanceMode ? 'Maintenance Mode Active' : 'Site is Live'}
              </h3>
              <p className={`text-sm ${
                isMaintenanceMode ? 'text-orange-700' : 'text-green-700'
              }`}>
                {isMaintenanceMode
                  ? 'Customers will see the maintenance page. Admin access is still available.'
                  : 'The website is accessible to all visitors.'}
              </p>
            </div>
          </div>
        </div>

        {/* Toggle Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4">Maintenance Control</h3>
            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-br from-gold-500 to-gold-600 p-3 rounded-lg">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Enable Maintenance Mode</p>
                  <p className="text-sm text-slate-600">
                    Temporarily disable public access to the website
                  </p>
                </div>
              </div>
              <button
                onClick={toggleMaintenanceMode}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  isMaintenanceMode ? 'bg-orange-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    isMaintenanceMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="font-bold text-blue-900 mb-3">Important Information</h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>When maintenance mode is enabled, customers will see a dedicated maintenance page</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Admin users can still access the admin panel at /admin</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Use this feature during updates, backups, or system maintenance</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Remember to disable maintenance mode when work is complete</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default MaintenanceSettings
