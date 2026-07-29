import { NextRequest, NextResponse } from 'next/server';
import { stripe, getPlan, isStripeDemoMode, type PlanId } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, locale, plan: planId } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const plan = getPlan(planId as PlanId);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const loc = locale || 'es';

    if (isStripeDemoMode()) {
      const demoSessionId = `demo_${Date.now()}`;
      return NextResponse.json({
        url: `${appUrl}/${loc}/resultado?session_id=${demoSessionId}&email=${encodeURIComponent(email)}&plan=${plan.id}`,
        sessionId: demoSessionId,
        demo: true,
        plan: plan.id,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: plan.productName,
              description: plan.description,
            },
            unit_amount: plan.priceCents,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: plan.trialDays,
        metadata: {
          name,
          phone: phone || '',
          plan: plan.id,
          trial_days: String(plan.trialDays),
        },
      },
      metadata: {
        name,
        phone: phone || '',
        locale: loc,
        plan: plan.id,
        trial_days: String(plan.trialDays),
      },
      success_url: `${appUrl}/${loc}/resultado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/${loc}/inscripcion?cancelled=true&plan=${plan.id}`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url, sessionId: session.id, plan: plan.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout failed' },
      { status: 500 }
    );
  }
}
