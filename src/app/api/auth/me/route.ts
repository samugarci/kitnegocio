import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE, roleForEmail, verifySessionToken } from '@/lib/auth-store';
import { createSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const session = verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  // Fast path: trust signed session (no disk / Supabase round-trip)
  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.sub,
        email: session.email,
        name: session.name,
        phone: '',
        plan: session.plan,
        status: session.status,
        role: roleForEmail(session.email, session.role),
      },
    });
  }

  const admin = createSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.sub,
        email: session.email,
        name: session.name,
        phone: '',
        plan: session.plan,
        status: session.status,
        role: roleForEmail(session.email, session.role),
      },
    });
  }

  const [profileRes, subRes] = await Promise.all([
    admin.from('profiles').select('full_name,email,phone,role').eq('id', session.sub).maybeSingle(),
    admin.from('subscriptions').select('plan,status').eq('user_id', session.sub).maybeSingle(),
  ]);

  const profile = profileRes.data;
  const sub = subRes.data;

  return NextResponse.json({
    authenticated: true,
    user: {
      id: session.sub,
      email: profile?.email || session.email,
      name: profile?.full_name || session.name,
      phone: profile?.phone || '',
      plan: sub?.plan || session.plan,
      status: sub?.status || session.status,
      role: roleForEmail(
        profile?.email || session.email,
        profile?.role === 'super_admin' ? 'super_admin' : session.role
      ),
    },
  });
}
