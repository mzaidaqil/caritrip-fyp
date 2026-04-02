import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { login } from "@/services/authServices"
import useAuth from "@/hooks/useAuth"

export default function LoginForm() {
  const navigate = useNavigate()
  const { login: loginUser } = useAuth()

  const [form, setForm] = useState({
    email: "",
    password: "",
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
      const data = await login({ ...form, role: "user" })
      loginUser(data)          // saves to AuthContext + localStorage
      navigate("/")        // optional redirect
    } catch (err) {
      setError(err.message || "Login failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  )
}