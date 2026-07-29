import { NextRequest, NextResponse } from 'next/server';
import { stripe, isStripeDemoMode } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const normalizedEmail = email.trim().toLowerCase();

    if (isStripeDemoMode()) {
      return NextResponse.json({
        url: `${appUrl}/es/miembros?email=${encodeURIComponent(normalizedEmail)}&demo=portal`,
        demo: true,
      });
    }

    const customers = await stripe.customers.list({ email: normalizedEmail, limit: 1 });

    if (customers.data.length === 0) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customers.data[0].id,
      return_url: `${appUrl}/es/miembros?email=${encodeURIComponent(normalizedEmail)}`,
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
