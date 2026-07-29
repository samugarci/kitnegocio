import { NextRequest, NextResponse } from 'next/server';
import { stripe, isStripeDemoMode } from '@/lib/stripe';

async function hasActiveSubscription(email: string): Promise<boolean> {
  const customers = await stripe.customers.list({ email, limit: 1 });

  if (customers.data.length === 0) return false;

  const subscriptions = await stripe.subscriptions.list({
    customer: customers.data[0].id,
    status: 'all',
    limit: 10,
  });

  return subscriptions.data.some(
    (sub) => sub.status === 'active' || sub.status === 'trialing'
  );
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (isStripeDemoMode()) {
      const demoEmails = ['demo@kitnegocio.com', 'test@test.com'];
      const hasAccess = demoEmails.includes(normalizedEmail) || normalizedEmail.includes('@');
      return NextResponse.json({
        hasAccess,
        demo: true,
        email: normalizedEmail,
      });
    }

    const hasAccess = await hasActiveSubscription(normalizedEmail);

    return NextResponse.json({ hasAccess, email: normalizedEmail });
  } catch (error) {
    console.error('Verify access error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Verification failed' },
      { status: 500 }
    );
  }
}
