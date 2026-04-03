import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check both localStorage (remember me) and sessionStorage (current session)
    const savedUser = localStorage.getItem('adminUser') || sessionStorage.getItem('adminUser')
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    if (user) {
      // Check if remember me was enabled
      const rememberMe = localStorage.getItem('rememberMe') === 'true'
      if (rememberMe) {
        localStorage.setItem('adminUser', JSON.stringify(user))
      } else {
        sessionStorage.setItem('adminUser', JSON.stringify(user))
      }
    } else {
      localStorage.removeItem('adminUser')
      sessionStorage.removeItem('adminUser')
    }
  }, [user])

  const login = (email, password, rememberMe = false) => {
    // Simple authentication - in production, use proper backend
    if (email === 'admin@luxe.com' && password === 'admin123') {
      const adminUser = {
        id: '1',
        email: 'admin@luxe.com',
        name: 'Admin User',
        role: 'Admin',
        phone: '+1 (555) 123-4567',
      }
      setUser(adminUser)
      
      // Store based on remember me preference
      if (rememberMe) {
        localStorage.setItem('adminUser', JSON.stringify(adminUser))
        localStorage.setItem('rememberMe', 'true')
      } else {
        sessionStorage.setItem('adminUser', JSON.stringify(adminUser))
        localStorage.removeItem('rememberMe')
      }
      
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('adminUser')
    sessionStorage.removeItem('adminUser')
    // Keep remembered email if it exists
  }

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData }
    setUser(updatedUser)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'Admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
