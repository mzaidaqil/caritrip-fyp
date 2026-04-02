import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext.jsx'

// Convenience hook to access auth state/actions across the app.
export default function useAuth() {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error('useAuth must be used inside an <AuthProvider>')
  }

  return ctx
}
