import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2023-10-16',
  typescript: true,
});

/** Compra única — acceso completo a todos los servicios */
export type PlanId = 'full';

export type PlanConfig = {
  id: PlanId;
  priceCents: number;
  productName: string;
  description: string;
};

export const ONE_TIME_PRODUCT: PlanConfig = {
  id: 'full',
  priceCents: 1999, // $19.99 USD
  productName: 'KitNegocio Acceso Completo',
  description: 'Compra única $19.99 USD · acceso a todos los catálogos y guías',
};

/** @deprecated Compatibilidad: cualquier plan antiguo se trata como compra única */
export function getPlan(_planId?: string | null): PlanConfig {
  return ONE_TIME_PRODUCT;
}

export function isStripeDemoMode(): boolean {
  const key = process.env.STRIPE_SECRET_KEY;
  return !key || key === 'sk_test_...' || key === 'sk_test_placeholder';
}
