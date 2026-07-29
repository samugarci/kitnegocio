import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2023-10-16',
  typescript: true,
});

export type PlanId = 'starter' | 'pro';

export type PlanConfig = {
  id: PlanId;
  priceCents: number;
  trialDays: number;
  productName: string;
  description: string;
};

/** Planes de suscripción mensuales (USD) */
export const PLANS: Record<PlanId, PlanConfig> = {
  starter: {
    id: 'starter',
    priceCents: 1199, // $11.99
    trialDays: 7,
    productName: 'KitNegocio Starter',
    description: 'Suscripción $11.99 USD/mes · 7 días gratis',
  },
  pro: {
    id: 'pro',
    priceCents: 2599, // $25.99
    trialDays: 15,
    productName: 'KitNegocio Pro',
    description: 'Suscripción $25.99 USD/mes · 15 días gratis',
  },
};

export const DEFAULT_PLAN: PlanId = 'starter';

export function getPlan(planId?: string | null): PlanConfig {
  if (planId === 'pro' || planId === 'starter') return PLANS[planId];
  return PLANS[DEFAULT_PLAN];
}

export function isStripeDemoMode(): boolean {
  const key = process.env.STRIPE_SECRET_KEY;
  return !key || key === 'sk_test_...' || key === 'sk_test_placeholder';
}
