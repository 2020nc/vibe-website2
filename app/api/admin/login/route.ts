import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

async function sha256(text: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email și parola sunt obligatorii.' }, { status: 400 })
  }

  const hash = await sha256(password)

  const { data } = await getSupabase()
    .from('admins')
    .select('id, tenant_id, password_hash')
    .eq('email', email.toLowerCase().trim())
    .single()

  if (!data || data.password_hash !== hash) {
    return NextResponse.json({ error: 'Email sau parolă incorectă.' }, { status: 401 })
  }

  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 8,
    path: '/',
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set('admin_token', hash, cookieOpts)
  response.cookies.set('admin_tenant', data.tenant_id, cookieOpts)

  return response
}
