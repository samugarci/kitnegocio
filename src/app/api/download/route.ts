import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { SESSION_COOKIE, findLocalUserById, verifySessionToken } from '@/lib/auth-store';
import { recordActivity } from '@/lib/activity';
import { createSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

const ALLOWED = new Set([
  'jan-2026/calendario-ig.pdf',
  'jan-2026/factura-profesional.xlsx',
  'feb-2026/factura-profesional.xlsx',
  'feb-2026/presupuesto-comercial.xlsx',
  'mar-2026/banco-captions-hashtags.pdf',
  'mar-2026/calendario-crecimiento-30-dias.pdf',
  'mar-2026/catalogo-whatsapp-ventas.pdf',
  'mar-2026/calendario-ig.pdf',
  'mar-2026/checklist-operativo.xlsx',
  'mar-2026/factura-profesional.xlsx',
  'mar-2026/guia-instagram-30-posts.pdf',
  'mar-2026/guia-precios-freelancers.pdf',
  'mar-2026/guia-reels-12-guiones.pdf',
  'mar-2026/guia-stories-conversion.pdf',
  'mar-2026/kitnegocio-pack-marzo.zip',
  'mar-2026/presupuesto-comercial.xlsx',
  'mar-2026/propuesta-servicios.pdf',
]);

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? verifySessionToken(token) : null;
  if (!session) {
    return NextResponse.json({ error: 'Debes iniciar sesión' }, { status: 401 });
  }

  let currentStatus = String(session.status || '').toLowerCase();
  if (isSupabaseConfigured()) {
    const admin = createSupabaseAdmin();
    if (admin) {
      const { data: subscription } = await admin
        .from('subscriptions')
        .select('status')
        .eq('user_id', session.sub)
        .maybeSingle();
      currentStatus = String(subscription?.status || currentStatus).toLowerCase();
    }
  } else {
    const user = await findLocalUserById(session.sub);
    if (!user) {
      return NextResponse.json({ error: 'Tu cuenta ya no existe' }, { status: 401 });
    }
    currentStatus = String(user.status || '').toLowerCase();
  }

  if (!['demo_active', 'active', 'trialing'].includes(currentStatus)) {
    return NextResponse.json({ error: 'Tu acceso no está activo' }, { status: 403 });
  }

  const file = request.nextUrl.searchParams.get('file') || '';
  const normalized = file.replace(/^\/+/, '').replace(/^packs\//, '');
  if (!ALLOWED.has(normalized)) {
    return NextResponse.json({ error: 'Archivo no encontrado' }, { status: 404 });
  }

  const absolute = path.join(process.cwd(), 'public', 'packs', normalized);
  try {
    const data = await fs.readFile(absolute);
    await recordActivity(session.sub, 'download', `Descargó ${normalized}`).catch(() => undefined);
    const filename = path.basename(normalized);
    const ext = path.extname(filename).toLowerCase();
    const type =
      ext === '.pdf'
        ? 'application/pdf'
        : ext === '.zip'
          ? 'application/zip'
          : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    return new NextResponse(data, {
      headers: {
        'Content-Type': type,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'private, no-store',
      },
    });
  } catch {
    return NextResponse.json({ error: 'No se pudo leer el archivo' }, { status: 404 });
  }
}
