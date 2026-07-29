'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Clock3 } from 'lucide-react';

function ProfessionalPrice({
  price,
  currency,
  period,
  light = false,
}: {
  price: string;
  currency: string;
  period: string;
  light?: boolean;
}) {
  const cleaned = price.replace(/[^0-9.]/g, '');
  const [whole, cents = '00'] = cleaned.split('.');

  return (
    <div className="flex items-end gap-1.5">
      <span
        className={`mb-2 font-sans text-xl font-semibold ${light ? 'text-white/80' : 'text-ink-soft'}`}
      >
        $
      </span>
      <span
        className={`font-sans text-5xl font-semibold leading-none tracking-tight tabular-nums md:text-6xl ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {whole}
      </span>
      <div className="mb-1.5 flex flex-col">
        <span
          className={`font-sans text-lg font-semibold leading-none tabular-nums ${
            light ? 'text-white' : 'text-ink'
          }`}
        >
          .{cents}
        </span>
        <span
          className={`mt-1 text-[11px] font-medium uppercase tracking-wide ${
            light ? 'text-white/70' : 'text-ink-faint'
          }`}
        >
          {currency}/{period}
        </span>
      </div>
    </div>
  );
}

export default function Pricing() {
  const t = useTranslations('pricing');
  const locale = useLocale();

  const plans = [
    {
      id: 'starter' as const,
      popular: false,
      price: t('plans.starter.price'),
      trial: t('plans.starter.trial'),
      name: t('plans.starter.name'),
      desc: t('plans.starter.desc'),
      benefits: t.raw('plans.starter.benefits') as string[],
      cta: t('plans.starter.cta'),
    },
    {
      id: 'pro' as const,
      popular: true,
      price: t('plans.pro.price'),
      trial: t('plans.pro.trial'),
      name: t('plans.pro.name'),
      desc: t('plans.pro.desc'),
      benefits: t.raw('plans.pro.benefits') as string[],
      cta: t('plans.pro.cta'),
    },
  ];

  return (
    <section id="pricing" className="bg-paper-warm py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-sub">{t('subtitle')}</p>
        </motion.div>

        <div className="grid items-stretch gap-6 md:grid-cols-2 md:gap-8">
          {plans.map((plan, i) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col overflow-hidden rounded-2xl border bg-white ${
                plan.popular
                  ? 'border-accent/40 shadow-[0_28px_60px_-32px_rgba(240,89,42,0.45)] ring-1 ring-accent/20'
                  : 'border-slate-200/90 shadow-[0_20px_48px_-32px_rgba(15,23,42,0.35)]'
              }`}
            >
              {plan.popular && (
                <div className="absolute right-5 top-5 z-10 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                  {t('popular')}
                </div>
              )}

              <div
                className={`border-b px-7 pb-7 pt-8 ${
                  plan.popular
                    ? 'border-accent/10 bg-gradient-to-b from-accent/[0.07] to-white'
                    : 'border-slate-100 bg-gradient-to-b from-slate-50 to-white'
                }`}
              >
                <p
                  className={`text-xs font-bold uppercase tracking-[0.16em] ${
                    plan.popular ? 'text-accent' : 'text-brand'
                  }`}
                >
                  {plan.name}
                </p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">{plan.desc}</p>

                <div className="mt-6">
                  <ProfessionalPrice
                    price={plan.price}
                    currency={t('currency')}
                    period={t('period')}
                  />
                </div>

                <div
                  className={`mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${
                    plan.popular
                      ? 'bg-accent-light text-accent-dark'
                      : 'bg-brand-light text-brand-dark'
                  }`}
                >
                  <Clock3 className="h-4 w-4" />
                  {plan.trial}
                </div>
              </div>

              <div className="flex flex-1 flex-col px-7 py-7">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-faint">
                  {t('includes')}
                </p>
                <ul className="mb-8 flex-1 space-y-3.5">
                  {plan.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          plan.popular ? 'bg-accent text-white' : 'bg-brand text-white'
                        }`}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-[15px] leading-snug text-ink-soft">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/${locale}/inscripcion?plan=${plan.id}`}
                  className={`w-full text-center ${plan.popular ? 'btn-accent' : 'btn-primary'}`}
                >
                  {plan.cta}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <p className="mt-4 text-center text-xs text-ink-faint">{t('secureNote')}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
