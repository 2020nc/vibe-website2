import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

function getTenantId(req: NextRequest): string | null {
  return req.cookies.get('admin_tenant')?.value ?? null;
}

// GET /api/menu — returnează toate produsele ordonate
// Dacă există cookie admin_tenant, filtrează după tenant; altfel returnează toate (site public)
export async function GET(req: NextRequest) {
  const tenantId = getTenantId(req);

  let query = getSupabase()
    .from('menu_items')
    .select('*')
    .order('category')
    .order('sort_order')
    .order('name');

  const effectiveTenantId = tenantId ?? process.env.NEXT_PUBLIC_TENANT_ID ?? null;
  if (effectiveTenantId) {
    query = query.eq('tenant_id', effectiveTenantId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

// POST /api/menu — adaugă produs nou
export async function POST(req: NextRequest) {
  const tenantId = getTenantId(req);
  if (!tenantId) {
    return NextResponse.json({ error: 'Neautorizat.' }, { status: 401 });
  }

  const body = await req.json();
  const { name, category, price } = body;

  if (!name || !category || price === undefined) {
    return NextResponse.json(
      { error: 'Câmpurile name, category și price sunt obligatorii.' },
      { status: 400 }
    );
  }

  const { data, error } = await getSupabase()
    .from('menu_items')
    .insert([{
      name:            body.name,
      category:        body.category,
      price:           body.price,
      description:     body.description     ?? null,
      image_url:       body.image_url       ?? null,
      discount_type:   body.discount_type   ?? null,
      discount_amount: body.discount_amount ?? null,
      sort_order:      body.sort_order      ?? 0,
      available:       body.available       ?? true,
      tenant_id:       tenantId,
    }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}

// PATCH /api/menu — editează un produs
export async function PATCH(req: NextRequest) {
  const tenantId = getTenantId(req);
  if (!tenantId) {
    return NextResponse.json({ error: 'Neautorizat.' }, { status: 401 });
  }

  const body = await req.json();
  const { id, ...fields } = body;

  if (!id) {
    return NextResponse.json({ error: 'Lipsește câmpul id.' }, { status: 400 });
  }

  const allowed = ['name', 'category', 'price', 'description', 'image_url',
                   'discount_type', 'discount_amount', 'available', 'sort_order'];
  const update: Record<string, unknown> = {};
  allowed.forEach((key) => {
    if (key in fields) update[key] = fields[key];
  });

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'Niciun câmp valid de actualizat.' }, { status: 400 });
  }

  const { error } = await getSupabase()
    .from('menu_items')
    .update(update)
    .eq('id', id)
    .eq('tenant_id', tenantId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// DELETE /api/menu — șterge un produs
export async function DELETE(req: NextRequest) {
  const tenantId = getTenantId(req);
  if (!tenantId) {
    return NextResponse.json({ error: 'Neautorizat.' }, { status: 401 });
  }

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'Lipsește câmpul id.' }, { status: 400 });
  }

  const { error } = await getSupabase()
    .from('menu_items')
    .delete()
    .eq('id', id)
    .eq('tenant_id', tenantId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
