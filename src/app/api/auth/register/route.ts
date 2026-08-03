import { NextRequest, NextResponse } from 'next/server';
import {
  SESSION_COOKIE,
  createLocalUser,
  findLocalUserByEmail,
  recordLocalActivity,
  roleForEmail,
  signSession,
  type PlanId,
} from '@/lib/auth-store';
import { createSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

function cookieOptions(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSeconds,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || '')
      .trim()
      .toLowerCase();
    const password = String(body.password || '');
    const fullName = String(body.name || body.fullName || '').trim();
    const phone = String(body.phone || '').trim();
    const plan: PlanId = 'full';
    const autoLogin = body.autoLogin !== false;
    const role = roleForEmail(email);

    if (!email || !password || !fullName) {
      return NextResponse.json({ error: 'Nombre, correo y contraseña son obligatorios' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'La contraseña debe tener al menos 8 caracteres' }, { status: 400 });
    }

    // Prefer Supabase when configured
    if (isSupabaseConfigured()) {
      const admin = createSupabaseAdmin();
      if (!admin) {
        return NextResponse.json(
          { error: 'Falta SUPABASE_SERVICE_ROLE_KEY en .env.local' },
          { status: 500 }
        );
      }

      const { data, error } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: fullName, phone, plan, role },
      });

      if (error || !data.user) {
        const msg = error?.message || 'No se pudo crear la cuenta';
        if (msg.toLowerCase().includes('already') || msg.toLowerCase().includes('registered')) {
          return NextResponse.json({ error: 'Ese correo ya tiene una cuenta' }, { status: 409 });
        }
        return NextResponse.json({ error: msg }, { status: 400 });
      }

      await admin.from('subscriptions').upsert({
        user_id: data.user.id,
        plan: 'full',
        status: 'active',
        trial_ends_at: null,
        updated_at: new Date().toISOString(),
      });
      await admin.from('profiles').update({ role }).eq('id', data.user.id);
      await admin.from('activity_logs').insert({
        user_id: data.user.id,
        event_type: 'register',
        detail: 'Cuenta creada',
      });

      const res = NextResponse.json({
        ok: true,
        provider: 'supabase',
        user: { id: data.user.id, email, name: fullName, plan: 'full', status: 'active', role },
      });
      if (autoLogin) {
        const token = signSession({
          sub: data.user.id,
          email,
          name: fullName,
          plan: 'full',
          status: 'active',
          role,
        });
        res.cookies.set(SESSION_COOKIE, token, cookieOptions(14 * 24 * 60 * 60));
      }
      return res;
    }

    // Local secure fallback (hashed passwords on disk)
    const existing = await findLocalUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: 'Ese correo ya tiene una cuenta' }, { status: 409 });
    }

    const user = await createLocalUser({ email, password, fullName, phone, plan });
    await recordLocalActivity(user.id, 'register', 'Cuenta creada');

    const res = NextResponse.json({
      ok: true,
      provider: 'local',
      user: {
        id: user.id,
        email: user.email,
        name: user.fullName,
        plan: user.plan,
        status: user.status,
        role: user.role,
      },
    });
    if (autoLogin) {
      const token = signSession({
        sub: user.id,
        email: user.email,
        name: user.fullName,
        plan: user.plan,
        status: user.status,
        role: user.role,
      });
      res.cookies.set(SESSION_COOKIE, token, cookieOptions(14 * 24 * 60 * 60));
    }
    return res;
  } catch (error) {
    if (error instanceof Error && error.message === 'EMAIL_EXISTS') {
      return NextResponse.json({ error: 'Ese correo ya tiene una cuenta' }, { status: 409 });
    }
    console.error('Register error:', error);
    return NextResponse.json({ error: 'No se pudo registrar la cuenta' }, { status: 500 });
  }
}
