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
    const saved = localStorage.getItem('adminUser')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('adminUser', JSON.stringify(user))
    } else {
      localStorage.removeItem('adminUser')
    }
  }, [user])

  const login = (email, password) => {
    // Simple authentication - in production, use proper backend
    if (email === 'admin@luxe.com' && password === 'admin123') {
      const adminUser = {
        id: '1',
        email: 'admin@luxe.com',
        name: 'Admin User',
        role: 'admin',
      }
      setUser(adminUser)
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
