import { NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { getSupabase } from '@/lib/supabase'

function sha256(text: string): string {
  return createHash('sha256').update(text).digest('hex')
}

export async function POST(request: Request) {
  // Verifică că userul e autentificat
  const cookieHeader = request.headers.get('cookie') ?? ''
  const tokenMatch = cookieHeader.match(/admin_token=([a-f0-9]{64})/)
  if (!tokenMatch) {
    return NextResponse.json({ error: 'Neautorizat' }, { status: 401 })
  }
  const currentToken = tokenMatch[1]

  const { oldPassword, newPassword } = await request.json()

  if (!newPassword || newPassword.length < 6) {
    return NextResponse.json({ error: 'Parola nouă trebuie să aibă minim 6 caractere.' }, { status: 400 })
  }

  // Verifică parola veche
  const oldHash = sha256(oldPassword)

  const { data } = await getSupabase()
    .from('admin_config')
    .select('password_hash')
    .eq('id', 1)
    .single()

  const validHash = data?.password_hash ?? sha256(process.env.ADMIN_SECRET ?? '')

  if (oldHash !== validHash) {
    return NextResponse.json({ error: 'Parola veche este incorectă.' }, { status: 400 })
  }

  // Salvează parola nouă
  const newHash = sha256(newPassword)
  const supabase = getSupabase()

  if (data) {
    await supabase.from('admin_config').update({ password_hash: newHash }).eq('id', 1)
  } else {
    await supabase.from('admin_config').insert({ id: 1, password_hash: newHash })
  }

  // Actualizează cookie-ul cu noul hash
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
