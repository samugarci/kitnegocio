import { NextRequest, NextResponse } from 'next/server';
import { stripe, isStripeDemoMode } from '@/lib/stripe';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth-store';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const session = token ? verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: 'Debes iniciar sesión' }, { status: 401 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const normalizedEmail = session.email.trim().toLowerCase();

    if (isStripeDemoMode()) {
      return NextResponse.json({
        url: `${appUrl}/es/miembros?demo=portal`,
        demo: true,
      });
    }

    const customers = await stripe.customers.list({ email: normalizedEmail, limit: 1 });

    if (customers.data.length === 0) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customers.data[0].id,
      return_url: `${appUrl}/es/miembros`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error('Portal error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Portal failed' },
      { status: 500 }
    );
  }
}
