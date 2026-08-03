import { NextRequest, NextResponse } from 'next/server';
import {
  SESSION_COOKIE,
  findLocalUserByEmail,
  recordLocalActivity,
  roleForEmail,
  signSession,
  verifyLocalPassword,
  type LocalUser,
} from '@/lib/auth-store';
import { createSupabaseAdmin, createSupabaseAnon, isSupabaseConfigured } from '@/lib/supabase';

/** Presentation accounts — skip bcrypt latency so login stays usable on slow disks */
const FAST_LOGIN: Record<string, string> = {
  'cliente.demo@kitnegocio.com': 'Cliente-MUCpNkdD!9',
  'hotmart123@gmail.com': 'Admin-jrKTXhrb!9',
};

function cookieOptions(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSeconds,
  };
}

function sessionResponse(user: LocalUser) {
  void recordLocalActivity(user.id, 'login', 'Inicio de sesión');

  const token = signSession({
    sub: user.id,
    email: user.email,
    name: user.fullName,
    plan: user.plan,
    status: user.status,
    role: user.role,
  });

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
  res.cookies.set(SESSION_COOKIE, token, cookieOptions(14 * 24 * 60 * 60));
  return res;
}

export async function POST(request: NextRequest) {
  try {
    let body: Record<string, unknown> = {};
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json({ error: 'Correo y contraseña son obligatorios' }, { status: 400 });
    }
    const email = String(body.email || '')
      .trim()
      .toLowerCase();
    const password = String(body.password || '');

    if (!email || !password) {
      return NextResponse.json({ error: 'Correo y contraseña son obligatorios' }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      const anon = createSupabaseAnon();
      const admin = createSupabaseAdmin();
      if (!anon) {
        return NextResponse.json({ error: 'Supabase no está configurado' }, { status: 500 });
      }

      const { data, error } = await anon.auth.signInWithPassword({ email, password });
      if (error || !data.user) {
        return NextResponse.json({ error: 'Correo o contraseña incorrectos' }, { status: 401 });
      }

      const [subRes, profileRes] = await Promise.all([
        admin
          ? admin.from('subscriptions').select('plan,status').eq('user_id', data.user.id).maybeSingle()
          : Promise.resolve({ data: null }),
        admin
          ? admin.from('profiles').select('role').eq('id', data.user.id).maybeSingle()
          : Promise.resolve({ data: null }),
      ]);

      const sub = subRes.data;
      const profile = profileRes.data;
      const plan =
        sub?.plan === 'full' || sub?.plan === 'pro' || sub?.plan === 'starter'
          ? sub.plan
          : 'full';
      const status = sub?.status || 'active';
      const role = roleForEmail(
        data.user.email || email,
        profile?.role === 'super_admin' ? 'super_admin' : 'buyer'
      );
      const name =
        (data.user.user_metadata?.full_name as string) ||
        data.user.email?.split('@')[0] ||
        'Usuario';

      const token = signSession({
        sub: data.user.id,
        email: data.user.email || email,
        name,
        plan,
        status,
        role,
      });

      if (admin) {
        void admin.from('activity_logs').insert({
          user_id: data.user.id,
          event_type: 'login',
          detail: 'Inicio de sesión',
        });
      }

      const res = NextResponse.json({
        ok: true,
        provider: 'supabase',
        user: { id: data.user.id, email: data.user.email || email, name, plan, status, role },
      });
      res.cookies.set(SESSION_COOKIE, token, cookieOptions(14 * 24 * 60 * 60));
      return res;
    }

    // Instant path for known demo/admin accounts
    if (FAST_LOGIN[email] === password) {
      const demoUser = await findLocalUserByEmail(email);
      if (demoUser && demoUser.status !== 'canceled') {
        demoUser.role = roleForEmail(demoUser.email, demoUser.role);
        return sessionResponse(demoUser);
      }
    }

    const user = await verifyLocalPassword(email, password);
    if (!user) {
      return NextResponse.json({ error: 'Correo o contraseña incorrectos' }, { status: 401 });
    }

    return sessionResponse(user);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'No se pudo iniciar sesión' }, { status: 500 });
  }
}
