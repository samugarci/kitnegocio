import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe, isStripeDemoMode } from '@/lib/stripe';

function isSessionVerified(session: Stripe.Checkout.Session): boolean {
  if (session.status !== 'complete') return false;

  if (session.payment_status === 'paid' || session.payment_status === 'no_payment_required') {
    return true;
  }

  return false;
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
  }

  if (isStripeDemoMode()) {
    return NextResponse.json({
      verified: sessionId.startsWith('demo_'),
      demo: true,
      sessionId,
      email: request.nextUrl.searchParams.get('email') || 'demo@kitnegocio.com',
      name: 'Demo User',
      purchase: true,
      plan: 'full',
    });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      verified: isSessionVerified(session),
      sessionId: session.id,
      email: session.customer_email,
      name: session.metadata?.name,
      purchase: session.mode === 'payment',
      plan: session.metadata?.plan || 'full',
    });
  } catch {
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
  }
}
