/**
 * API Route: /api/menu-settings
 *
 * Gestionează setările de afișare ale meniului public.
 *
 * Supabase — creează tabelul cu:
 *   CREATE TABLE menu_display_settings (
 *     id integer PRIMARY KEY DEFAULT 1,
 *     show_currency_toggle boolean DEFAULT false,
 *     show_column_toggle boolean DEFAULT false
 *   );
 *   INSERT INTO menu_display_settings (id, show_currency_toggle, show_column_toggle)
 *   VALUES (1, false, false);
 *
 * GET  — returnează setările curente
 * PATCH — actualizează setările (necesită cookie admin_tenant)
 */

import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export interface MenuDisplaySettings {
  show_currency_toggle: boolean;
  show_column_toggle: boolean;
}

export async function GET() {
  const { data, error } = await getSupabase()
    .from('menu_display_settings')
    .select('show_currency_toggle, show_column_toggle')
    .eq('id', 1)
    .single();

  if (error) {
    // Fallback dacă tabelul nu există încă — toate opțiunile dezactivate
    return NextResponse.json({
      data: { show_currency_toggle: false, show_column_toggle: false },
    });
  }

  return NextResponse.json({ data });
}

export async function PATCH(req: NextRequest) {
  const tenantCookie = req.cookies.get('admin_tenant');
  if (!tenantCookie) {
    return NextResponse.json({ error: 'Neautorizat.' }, { status: 401 });
  }

  const body = await req.json();
  const update: Partial<MenuDisplaySettings> = {};

  if (typeof body.show_currency_toggle === 'boolean')
    update.show_currency_toggle = body.show_currency_toggle;
  if (typeof body.show_column_toggle === 'boolean')
    update.show_column_toggle = body.show_column_toggle;

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'Niciun câmp valid.' }, { status: 400 });
  }

  const { error } = await getSupabase()
    .from('menu_display_settings')
    .update(update)
    .eq('id', 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
