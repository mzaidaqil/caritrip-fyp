import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // Restore session on app load
  useEffect(() => {
    const stored = localStorage.getItem('authUser')
    if (!stored) return

    try {
      const parsed = JSON.parse(stored)
      if (parsed?.token) {
        setUser(parsed)
      }
    } catch (err) {
      console.error('Failed to parse authUser from localStorage:', err)
      localStorage.removeItem('authUser')
    }
  }, [])

  // userData expected shape: { token, email, role, ...optional }
  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('authUser', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('authUser')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}