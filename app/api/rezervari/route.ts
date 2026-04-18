import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export type RezervareStatus = 'în așteptare' | 'confirmat' | 'respins';
type RezervareStatusDb = 'pending' | 'confirmed' | 'cancelled';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

function mapStatusToDb(status: RezervareStatus | RezervareStatusDb): RezervareStatusDb {
  switch (status) {
    case 'în așteptare':
      return 'pending';
    case 'confirmat':
      return 'confirmed';
    case 'respins':
      return 'cancelled';
    default:
      return status;
  }
}

function getStatusCandidates(status: RezervareStatus | RezervareStatusDb): string[] {
  switch (status) {
    case 'în așteptare':
    case 'pending':
      return ['pending', 'în așteptare', 'in asteptare', 'asteptare'];
    case 'confirmat':
    case 'confirmed':
      return ['confirmed', 'confirmat', 'confirmat'];
    case 'respins':
    case 'cancelled':
      return ['cancelled', 'respins', 'respins'];
    default:
      return [status];
  }
}

async function insertRezervare(payload: {
  nume: string;
  email: string | null;
  telefon: string;
  data: string;
  ora: string;
  persoane: number;
  mesaj: string;
  tenant_id: string;
}) {
  return getSupabase()
    .from('rezervari')
    .insert([{ ...payload, status: 'în așteptare' }])
    .select()
    .single();
}

async function updateRezervareStatusWithCompatibleStatus(id: string, tenantId: string, status: RezervareStatus | RezervareStatusDb) {
  let lastError: { message: string } | null = null;

  for (const statusCandidate of getStatusCandidates(status)) {
    const { error } = await getSupabase()
      .from('rezervari')
      .update({ status: statusCandidate })
      .eq('id', id)
      .eq('tenant_id', tenantId);

    if (!error) {
      return { error: null };
    }

    lastError = error;

    if (!error.message.includes('rezervari_status_check')) {
      return { error };
    }
  }

  return { error: lastError };
}

// POST /api/rezervari — creează o rezervare nouă
export async function POST(req: NextRequest) {
  const { nume, email, telefon, data, ora, persoane, mesaj } = await req.json();
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

  if (!nume || !telefon || !data || !ora || !persoane) {
    return NextResponse.json({ error: 'Câmpuri obligatorii lipsă.' }, { status: 400 });
  }

  if (!tenantId) {
    return NextResponse.json({ error: 'Lipsește configurarea tenant-ului.' }, { status: 500 });
  }

  const { data: rezervare, error } = await insertRezervare({
    nume,
    email: email || null,
    telefon,
    data,
    ora,
    persoane,
    mesaj: mesaj || '',
    tenant_id: tenantId,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, rezervare });
}

// PATCH /api/rezervari — schimbă statusul unei rezervări
export async function PATCH(req: NextRequest) {
  const tenantId = req.cookies.get('admin_tenant')?.value;
  if (!tenantId) {
    return NextResponse.json({ error: 'Neautorizat.' }, { status: 401 });
  }

  const { id, status } = await req.json();

  if (!id || !status) {
    return NextResponse.json({ error: 'Lipsesc câmpurile id sau status.' }, { status: 400 });
  }

  const statusuriPermise: Array<RezervareStatus | RezervareStatusDb> = [
    'în așteptare',
    'confirmat',
    'respins',
    'pending',
    'confirmed',
    'cancelled',
  ];
  if (!statusuriPermise.includes(status)) {
    return NextResponse.json({ error: `Status invalid. Valori permise: ${statusuriPermise.join(', ')}` }, { status: 400 });
  }

  const { error } = await updateRezervareStatusWithCompatibleStatus(id, tenantId, mapStatusToDb(status));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// DELETE /api/rezervari — șterge o rezervare
export async function DELETE(req: NextRequest) {
  const tenantId = req.cookies.get('admin_tenant')?.value;
  if (!tenantId) {
    return NextResponse.json({ error: 'Neautorizat.' }, { status: 401 });
  }

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'Lipsește câmpul id.' }, { status: 400 });
  }

  const { error } = await getSupabase()
    .from('rezervari')
    .delete()
    .eq('id', id)
    .eq('tenant_id', tenantId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
