'use client';

import { useMemo, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Loader2,
  ShieldCheck,
  ArrowRight,
  Lock,
  UserRound,
  BadgeCheck,
  Building2,
  Shield,
} from 'lucide-react';
import FlowSteps from './FlowSteps';
import Logo from './Logo';
import InteractiveBankCard, {
  isBankCardComplete,
  type BankCardValues,
} from './InteractiveBankCard';
import type { PlanId } from '@/lib/stripe';

export default function EnrollmentForm() {
  const t = useTranslations('pricing');
  const tErrors = useTranslations('errors');
  const locale = useLocale();
  const searchParams = useSearchParams();

  const initialPlan = (searchParams.get('plan') === 'pro' ? 'pro' : 'starter') as PlanId;
  const [plan, setPlan] = useState<PlanId>(initialPlan);
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [card, setCard] = useState<BankCardValues>({
    number: '',
    expiry: '',
    cvc: '',
    holder: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptSubscription, setAcceptSubscription] = useState(false);
  const [acceptData, setAcceptData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [securePulse, setSecurePulse] = useState(false);
  const [error, setError] = useState('');

  const selected = useMemo(() => {
    const key = plan === 'pro' ? 'pro' : 'starter';
    return {
      id: key,
      name: t(`plans.${key}.name`),
      price: t(`plans.${key}.price`),
      trial: t(`plans.${key}.trial`),
      benefits: t.raw(`plans.${key}.benefits`) as string[],
      cta: t(`plans.${key}.cta`),
    };
  }, [plan, t]);

  const goToPayment = () => {
    setError('');
    if (!name.trim() || !email.trim()) {
      setError(tErrors('required'));
      return;
    }
    setStep(2);
    setSecurePulse(true);
    setTimeout(() => setSecurePulse(false), 1200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email) {
      setError(tErrors('required'));
      setStep(1);
      return;
    }
    if (!isBankCardComplete(card)) {
      setError(t('form.cardInvalid'));
      return;
    }
    if (!acceptTerms || !acceptSubscription || !acceptData) {
      setError(tErrors('termsRequired'));
      return;
    }

    setLoading(true);

    try {
      // Los datos de tarjeta NO se envían al servidor (PCI).
      // Stripe Checkout / demo valida el cobro de forma segura.
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          locale,
          plan,
          cardLast4: card.number.replace(/\D/g, '').slice(-4),
          cardBrand: card.number.replace(/\D/g, '').startsWith('4')
            ? 'visa'
            : card.number.replace(/\D/g, '').startsWith('5')
              ? 'mastercard'
              : 'card',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || tErrors('paymentFailed'));
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : tErrors('paymentFailed'));
      setLoading(false);
    }
  };

  const sessionRef = `KN-${plan.toUpperCase()}-SECURE`;

  return (
    <div>
      <FlowSteps current="inscripcion" />

      <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_32px_64px_-28px_rgba(15,23,42,0.28)] ring-1 ring-black/5">
        {/* Bank top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#0A1628] px-5 py-3.5 text-white md:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark shadow-inner">
              <Building2 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold tracking-wide">{t('form.bankTitle')}</p>
              <p className="font-mono text-[10px] tracking-wider text-white/50">
                {t('form.bankSubtitle')} · REF {sessionRef}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
            <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1">
              <Lock className="h-3 w-3 text-emerald-300" />
              {t('form.encrypted')}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1">
              <Shield className="h-3 w-3 text-sky-200" />
              Stripe PCI
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-emerald-100">
              <BadgeCheck className="h-3 w-3" />
              {t('form.verified')}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[0.92fr_1.18fr]">
          {/* Order summary — bank statement style */}
          <aside className="relative overflow-hidden bg-[#071822] p-7 text-white md:p-9 lg:p-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse 70% 50% at 10% 0%, rgba(14,116,144,0.45), transparent), radial-gradient(ellipse 60% 45% at 100% 100%, rgba(240,89,42,0.18), transparent)',
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />

            <div className="relative">
              <Logo inverted markClassName="h-10 w-10" className="!items-center" />
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">{t('subtitle')}</p>

              <div className="mt-8 overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                    {t('form.orderSummary')}
                  </p>
                  <span className="rounded-md bg-accent/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                    {selected.trial}
                  </span>
                </div>

                <div className="px-5 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                        {t('form.planLabel')}
                      </p>
                      <p className="mt-1 font-display text-2xl font-bold tracking-tight">
                        {selected.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                        {selected.price}
                      </p>
                      <p className="mt-0.5 text-xs text-white/55">
                        {t('currency')} / {t('period')}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-0 border-t border-white/10 pt-1">
                    {selected.benefits.slice(0, 4).map((benefit) => (
                      <div
                        key={benefit}
                        className="flex items-start gap-3 border-b border-white/[0.06] py-3 last:border-0"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/15">
                          <ShieldCheck className="h-3 w-3 text-emerald-300" />
                        </span>
                        <span className="text-sm leading-snug text-white/85">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-xl bg-black/25 px-4 py-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/55">{t('form.dueToday')}</span>
                      <span className="font-display text-lg font-bold text-emerald-300">
                        $0.00 USD
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-white/40">{t('form.dueTodayHint')}</p>
                  </div>
                </div>
              </div>

              <div className="mt-7 space-y-3 border-t border-white/10 pt-6 text-sm text-white/60">
                <p className="flex items-start gap-2.5">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  {t('form.trustLine1')}
                </p>
                <p className="flex items-start gap-2.5">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-200" />
                  {t('form.trustLine2')}
                </p>
              </div>
            </div>
          </aside>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="bg-[#F4F7F9] p-6 md:p-10"
          >
            <div className="mb-6 flex gap-2">
              {[
                { n: 1 as const, label: t('form.stepPersonal'), icon: UserRound },
                { n: 2 as const, label: t('form.stepPayment'), icon: Lock },
              ].map(({ n, label, icon: Icon }) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    if (n === 1) setStep(1);
                    if (n === 2) goToPayment();
                  }}
                  className={`flex flex-1 items-center gap-2 rounded-2xl border px-3 py-3 text-left transition-all ${
                    step === n
                      ? 'border-brand bg-white shadow-sm ring-2 ring-brand/20'
                      : 'border-transparent bg-white/60 text-ink-soft hover:bg-white'
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-xl text-sm font-bold ${
                      step === n ? 'bg-brand text-white' : 'bg-brand/10 text-brand'
                    }`}
                  >
                    {step > n ? <BadgeCheck className="h-4 w-4" /> : n}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-ink-faint">{t('form.stepLabel', { n })}</span>
                    <span className="flex items-center gap-1 truncate text-sm font-semibold text-ink">
                      <Icon className="h-3.5 w-3.5 shrink-0 text-brand" />
                      {label}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-5"
                >
                  <div>
                    <h1 className="font-display text-2xl font-bold text-ink md:text-3xl">
                      {t('form.personalTitle')}
                    </h1>
                    <p className="mt-1 text-sm text-ink-soft">{t('form.personalHint')}</p>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium text-ink">{t('form.choosePlan')}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {(['starter', 'pro'] as PlanId[]).map((id) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setPlan(id)}
                          className={`rounded-xl border px-3 py-3 text-left transition-all ${
                            plan === id
                              ? id === 'pro'
                                ? 'border-accent bg-accent-light ring-2 ring-accent/30'
                                : 'border-brand bg-brand-light ring-2 ring-brand/30'
                              : 'border-brand/15 bg-white hover:border-brand/40'
                          }`}
                        >
                          <p className="text-sm font-bold text-ink">{t(`plans.${id}.name`)}</p>
                          <p className="mt-1 font-display text-xl font-extrabold text-ink">
                            {t(`plans.${id}.price`)}
                          </p>
                          <p className="mt-1 text-xs font-semibold text-accent">
                            {t(`plans.${id}.trial`)}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-brand/10 bg-white p-5 shadow-sm space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
                        {t('form.name')}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bank-input"
                        autoComplete="name"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
                        {t('form.email')}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bank-input"
                        autoComplete="email"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
                        {t('form.phone')}
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bank-input"
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  {error && step === 1 && (
                    <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>
                  )}

                  <button type="button" onClick={goToPayment} className="btn-accent w-full">
                    {t('form.continueToCard')}
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-5"
                >
                  <div
                    className={`rounded-2xl border p-1 transition-shadow ${
                      securePulse
                        ? 'border-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.2)]'
                        : 'border-brand/10'
                    }`}
                  >
                    <div className="rounded-[14px] bg-white p-5 md:p-6">
                      <h1 className="font-display text-2xl font-bold text-ink md:text-3xl">
                        {t('form.paymentTitle')}
                      </h1>
                      <p className="mt-1 text-sm text-ink-soft">{t('form.paymentHint')}</p>

                      <div className="mt-5">
                        <InteractiveBankCard
                          value={card}
                          onChange={setCard}
                          labels={{
                            number: t('form.cardNumber'),
                            expiry: t('form.cardExpiry'),
                            cvc: t('form.cardCvc'),
                            holder: t('form.cardHolder'),
                            secureTitle: t('form.cardSectionTitle'),
                            secureHint: t('form.cardSectionHint'),
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 rounded-2xl border border-brand/10 bg-white p-5">
                    <label className="flex items-start gap-3 text-sm text-ink-soft">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="mt-1 rounded border-brand/30 text-brand focus:ring-brand"
                        required
                      />
                      <span>
                        {t('form.termsLabel')}{' '}
                        <Link
                          href={`/${locale}/terminos`}
                          className="font-medium text-brand hover:underline"
                          target="_blank"
                        >
                          {t('form.termsLink')}
                        </Link>{' '}
                        {t('form.termsAnd')}{' '}
                        <Link
                          href={`/${locale}/privacidad`}
                          className="font-medium text-brand hover:underline"
                          target="_blank"
                        >
                          {t('form.privacyLink')}
                        </Link>
                      </span>
                    </label>

                    <label className="flex items-start gap-3 text-sm text-ink-soft">
                      <input
                        type="checkbox"
                        checked={acceptSubscription}
                        onChange={(e) => setAcceptSubscription(e.target.checked)}
                        className="mt-1 rounded border-brand/30 text-brand focus:ring-brand"
                        required
                      />
                      <span>{t('form.subscriptionLabel')}</span>
                    </label>

                    <label className="flex items-start gap-3 text-sm text-ink-soft">
                      <input
                        type="checkbox"
                        checked={acceptData}
                        onChange={(e) => setAcceptData(e.target.checked)}
                        className="mt-1 rounded border-brand/30 text-brand focus:ring-brand"
                        required
                      />
                      <span>{t('form.dataLabel')}</span>
                    </label>
                  </div>

                  {error && (
                    <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>
                  )}

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-secondary w-full sm:w-auto"
                    >
                      {t('form.back')}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-accent w-full flex-1 disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          {t('form.processing')}
                        </>
                      ) : (
                        <>
                          <Lock className="h-5 w-5" />
                          {t('form.paySecure')}
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-center text-xs text-ink-faint">{t('form.wallets')}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
