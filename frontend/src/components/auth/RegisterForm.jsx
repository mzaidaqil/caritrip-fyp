import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { signup } from "@/services/authServices"
import useAuth from "@/hooks/useAuth"

export default function RegisterForm() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const data = await signup({ ...form, role: "user" })
      login(data)          // saves to AuthContext + localStorage
      navigate("/app/user/login")        // optional redirect
    } catch (err) {
      setError(err.message || "Signup failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={form.firstName}
            onChange={handleChange("firstName")}
            placeholder="First name"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={form.lastName}
            onChange={handleChange("lastName")}
            placeholder="Last name"
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={handleChange("email")}
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={form.password}
          onChange={handleChange("password")}
          placeholder="Password"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange("confirmPassword")}
          placeholder="Confirm password"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </Button>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  )
}