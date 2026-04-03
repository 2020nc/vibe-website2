import { NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { getSupabase } from '@/lib/supabase'

function sha256(text: string): string {
  return createHash('sha256').update(text).digest('hex')
}

export async function POST(request: Request) {
  const { password } = await request.json()
  const hash = sha256(password)

  // Verifică parola din Supabase
  const { data } = await getSupabase()
    .from('admin_config')
    .select('password_hash')
    .eq('id', 1)
    .single()

  const validHash = data?.password_hash ?? sha256(process.env.ADMIN_SECRET ?? '')

  if (hash !== validHash) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set('admin_token', hash, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    path: '/',
  })

  return response
}
