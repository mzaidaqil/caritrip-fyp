import React from 'react'
import RegisterForm from '../components/auth/RegisterForm.jsx'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
  } from "@/components/ui/card"


export default function UserSignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <Card>
            <CardHeader>
                <CardTitle className="text-center text-xl font-bold">Register as User</CardTitle>
            </CardHeader>
            <CardContent>
                <RegisterForm />
            </CardContent>
        </Card>
    </div>
  )
}

