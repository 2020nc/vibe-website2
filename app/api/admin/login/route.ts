import { NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { getSupabase } from '@/lib/supabase'

function sha256(text: string): string {
  return createHash('sha256').update(text).digest('hex')
}

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email și parola sunt obligatorii.' }, { status: 400 })
  }

  const hash = sha256(password)

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
