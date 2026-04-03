import { createContext, useContext, useState, useEffect } from 'react'

const MaintenanceContext = createContext()

export const useMaintenanceMode = () => {
  const context = useContext(MaintenanceContext)
  if (!context) {
    throw new Error('useMaintenanceMode must be used within MaintenanceProvider')
  }
  return context
}

export const MaintenanceProvider = ({ children }) => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(() => {
    const saved = localStorage.getItem('maintenanceMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('maintenanceMode', JSON.stringify(isMaintenanceMode))
  }, [isMaintenanceMode])

  const toggleMaintenanceMode = () => {
    setIsMaintenanceMode(prev => !prev)
  }

  return (
    <MaintenanceContext.Provider value={{ isMaintenanceMode, toggleMaintenanceMode }}>
      {children}
    </MaintenanceContext.Provider>
  )
}
