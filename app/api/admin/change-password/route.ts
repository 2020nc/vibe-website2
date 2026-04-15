import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { NextRequest } from 'next/server'

async function sha256(text: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function POST(request: NextRequest) {
  const token    = request.cookies.get('admin_token')?.value
  const tenantId = request.cookies.get('admin_tenant')?.value

  if (!token || !tenantId) {
    return NextResponse.json({ error: 'Neautorizat' }, { status: 401 })
  }

  const { oldPassword, newPassword } = await request.json()

  if (!newPassword || newPassword.length < 6) {
    return NextResponse.json({ error: 'Parola nouă trebuie să aibă minim 6 caractere.' }, { status: 400 })
  }

  const oldHash = await sha256(oldPassword)

  const { data } = await getSupabase()
    .from('admins')
    .select('id, password_hash')
    .eq('tenant_id', tenantId)
    .eq('password_hash', oldHash)
    .single()

  if (!data) {
    return NextResponse.json({ error: 'Parola veche este incorectă.' }, { status: 400 })
  }

  const newHash = await sha256(newPassword)

  await getSupabase()
    .from('admins')
    .update({ password_hash: newHash })
    .eq('id', data.id)

  const response = NextResponse.json({ ok: true })
  response.cookies.set('admin_token', newHash, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    path: '/',
  })

  return response
}
