import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route: /api/newsletter
 *
 * POST — abonează un email la newsletter
 *   Body: { email: string }
 *   Răspunsuri:
 *     201 — abonat cu succes
 *     409 — email deja existent
 *     400 — email lipsă sau invalid
 *     500 — eroare Supabase
 */

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Email invalid.' }, { status: 400 });
  }

  const supabase = getSupabase();

  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email: email.toLowerCase().trim() });

  if (error) {
    // Codul 23505 = unique constraint violation (email duplicat)
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Email deja abonat.' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Abonat cu succes!' }, { status: 201 });
}
