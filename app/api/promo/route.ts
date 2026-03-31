import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route: /api/promo
 *
 * GET  — returnează configurația bannerului promoțional
 * PATCH — actualizează configurația
 *
 * Tabel Supabase necesar:
 *   CREATE TABLE promo_config (
 *     id int PRIMARY KEY DEFAULT 1,
 *     enabled boolean DEFAULT false,
 *     min_order numeric DEFAULT 50,
 *     discount_type text DEFAULT 'percent',
 *     discount_amount numeric DEFAULT 10,
 *     message text DEFAULT ''
 *   );
 *   INSERT INTO promo_config (id) VALUES (1);
 */

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function GET() {
  const { data, error } = await getSupabase()
    .from('promo_config')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { enabled, min_order, discount_type, discount_amount, message } = body;

  if (!['percent', 'value'].includes(discount_type)) {
    return NextResponse.json(
      { error: 'discount_type trebuie să fie "percent" sau "value".' },
      { status: 400 }
    );
  }

  const { error } = await getSupabase()
    .from('promo_config')
    .update({ enabled, min_order, discount_type, discount_amount, message })
    .eq('id', 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
