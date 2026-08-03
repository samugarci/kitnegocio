import { NextRequest, NextResponse } from 'next/server';
import { stripe, getPlan, isStripeDemoMode } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, locale } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const plan = getPlan();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const loc = locale || 'es';

    if (isStripeDemoMode()) {
      const demoSessionId = `demo_${Date.now()}`;
      return NextResponse.json({
        url: `/${loc}/resultado?session_id=${demoSessionId}&email=${encodeURIComponent(email)}&plan=${plan.id}`,
        sessionId: demoSessionId,
        demo: true,
        plan: plan.id,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
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
          },
          quantity: 1,
        },
      ],
      metadata: {
        name,
        phone: phone || '',
        locale: loc,
        plan: plan.id,
        purchase_type: 'one_time',
      },
      success_url: `${appUrl}/${loc}/resultado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/${loc}/inscripcion?cancelled=true`,
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
