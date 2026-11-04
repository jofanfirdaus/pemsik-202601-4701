import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '@/layouts/AuthLayout'
import Card from '@/components/Card'
import Label from '@/components/Label'
import Input from '@/components/Input'
import Button from '@/components/Button'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email === '15860@mail.com' && password === '15860') {
      localStorage.setItem('user', JSON.stringify({ email }))
      navigate('/admin/dashboard')
    } else {
      setError('Email atau password salah!')
    }
  }

  return (
    <AuthLayout>
      <Card>
        <h1 className="text-2xl font-bold text-center text-red-600">ADMIN-15860</h1>
        <p className="text-xs text-center text-gray-500 mb-6">
          Silakan login untuk melanjutkan
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 px-3 py-2 text-xs text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </AuthLayout>
  )
}