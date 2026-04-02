import React from 'react'
import LoginForm from '../components/auth/LoginForm.jsx'

export default function UserLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <LoginForm />
      </div>
    </div>
  )
}

