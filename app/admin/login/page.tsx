'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Parolă incorectă.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <form onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-4">
        <div className="text-center mb-2">
          <span className="text-white text-2xl font-bold">Vibe Caffè</span>
          <p className="text-gray-400 text-sm mt-1">Panou de administrare</p>
        </div>
        <input
          type="password"
          placeholder="Parolă admin"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition">
          Intră în admin
        </button>
        <p className="text-center">
          <a href="/" className="text-gray-500 text-xs hover:text-gray-300">← Înapoi la site</a>
        </p>
      </form>
    </div>
  )
}
