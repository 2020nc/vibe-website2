import { NextRequest, NextResponse } from 'next/server'

// GET /api/admin/me — returnează tenant_id din cookie
export async function GET(request: NextRequest) {
  const tenantId = request.cookies.get('admin_tenant')?.value
  const token    = request.cookies.get('admin_token')?.value

  if (!tenantId || !token) {
    return NextResponse.json({ error: 'Neautorizat' }, { status: 401 })
  }

  return NextResponse.json({ tenantId })
}
