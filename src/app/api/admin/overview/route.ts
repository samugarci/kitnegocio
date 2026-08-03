import { NextRequest, NextResponse } from 'next/server';
import {
  SESSION_COOKIE,
  getLocalAdminOverview,
  roleForEmail,
  updateLocalUserByAdmin,
  verifySessionToken,
  type LocalUser,
  type PlanId,
  type UserRole,
} from '@/lib/auth-store';
import { clearActivityHistory, recordActivity } from '@/lib/activity';
import { createSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

function requireAdmin(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? verifySessionToken(token) : null;
  if (!session || roleForEmail(session.email, session.role) !== 'super_admin') return null;
  return session;
}

export async function GET(request: NextRequest) {
  const session = requireAdmin(request);
  if (!session) {
    return NextResponse.json({ error: 'Acceso exclusivo para superadministrador' }, { status: 403 });
  }

  if (isSupabaseConfigured()) {
    const admin = createSupabaseAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Supabase no está configurado completamente' }, { status: 500 });
    }

    const [{ data: profiles, error: profilesError }, { data: activities, error: activityError }] =
      await Promise.all([
        admin
          .from('profiles')
          .select('id,email,full_name,phone,role,created_at,subscriptions(plan,status,trial_ends_at)')
          .order('created_at', { ascending: false }),
        admin
          .from('activity_logs')
          .select('id,user_id,event_type,detail,created_at')
          .order('created_at', { ascending: false })
          .limit(250),
      ]);

    if (profilesError || activityError) {
      return NextResponse.json(
        { error: 'Ejecuta la migración 002_roles_activity.sql en Supabase' },
        { status: 500 }
      );
    }

    const users = (profiles || []).map((profile) => {
      const subscription = Array.isArray(profile.subscriptions)
        ? profile.subscriptions[0]
        : profile.subscriptions;
      return {
        id: profile.id,
        email: profile.email,
        fullName: profile.full_name,
        phone: profile.phone,
        role: profile.role || 'buyer',
        plan: subscription?.plan || 'full',
        status: subscription?.status || 'active',
        trialEndsAt: subscription?.trial_ends_at || null,
        createdAt: profile.created_at,
      };
    });

    return NextResponse.json({ users, activities: activities || [], provider: 'supabase' });
  }

  const overview = await getLocalAdminOverview();
  return NextResponse.json({ ...overview, provider: 'local' });
}

export async function PATCH(request: NextRequest) {
  const session = requireAdmin(request);
  if (!session) {
    return NextResponse.json({ error: 'Acceso exclusivo para superadministrador' }, { status: 403 });
  }

  const body = await request.json();
  const id = String(body.id || '');
  const plan =
    body.plan === 'full' || body.plan === 'pro' || body.plan === 'starter'
      ? (body.plan as PlanId)
      : undefined;
  const status = ['demo_active', 'active', 'canceled'].includes(body.status)
    ? (body.status as LocalUser['status'])
    : undefined;
  const role = ['super_admin', 'buyer'].includes(body.role)
    ? (body.role as UserRole)
    : undefined;
  const fullName =
    typeof body.fullName === 'string' ? body.fullName.trim().slice(0, 120) : undefined;
  const phone = typeof body.phone === 'string' ? body.phone.trim().slice(0, 40) : undefined;

  if (!id || (!plan && !status && !role && fullName === undefined && phone === undefined)) {
    return NextResponse.json({ error: 'Cambio inválido' }, { status: 400 });
  }
  if (id === session.sub && role === 'buyer') {
    return NextResponse.json(
      { error: 'No puedes quitarte tu propio acceso de superadministrador' },
      { status: 400 }
    );
  }
  if (fullName !== undefined && !fullName) {
    return NextResponse.json({ error: 'El nombre no puede quedar vacío' }, { status: 400 });
  }

  if (isSupabaseConfigured()) {
    const admin = createSupabaseAdmin();
    if (!admin) return NextResponse.json({ error: 'Supabase no disponible' }, { status: 500 });

    const profilePatch: Record<string, string> = {};
    if (role) profilePatch.role = role;
    if (fullName !== undefined) profilePatch.full_name = fullName;
    if (phone !== undefined) profilePatch.phone = phone;
    if (Object.keys(profilePatch).length) {
      await admin.from('profiles').update(profilePatch).eq('id', id);
    }
    if (plan || status) {
      await admin
        .from('subscriptions')
        .update({
          ...(plan ? { plan } : {}),
          ...(status ? { status } : {}),
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', id);
    }
  } else {
    const updated = await updateLocalUserByAdmin(id, {
      plan,
      status,
      role,
      fullName,
      phone,
    });
    if (!updated) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  }

  await recordActivity(
    session.sub,
    'subscription_update',
    `Actualizó usuario ${id}: ${JSON.stringify({ plan, status, role, fullName, phone })}`
  );
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const session = requireAdmin(request);
  if (!session) {
    return NextResponse.json({ error: 'Acceso exclusivo para superadministrador' }, { status: 403 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    if (body?.target && body.target !== 'activity') {
      return NextResponse.json(
        { error: 'Solo se permite limpiar el historial de actividad' },
        { status: 400 }
      );
    }

    const cleared = await clearActivityHistory();
    return NextResponse.json({
      ok: true,
      cleared,
      message: `Se eliminaron ${cleared} registros de actividad`,
    });
  } catch (error) {
    console.error('Clear activity error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'No se pudo limpiar la actividad' },
      { status: 500 }
    );
  }
}
