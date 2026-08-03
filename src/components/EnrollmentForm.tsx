'use client';

import { useMemo, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Loader2,
  ShieldCheck,
  ArrowRight,
  Lock,
  UserRound,
  BadgeCheck,
  Shield,
  CheckCircle2,
  Eye,
  EyeOff,
  ArrowLeft,
} from 'lucide-react';
import InteractiveBankCard, {
  isBankCardComplete,
  type BankCardValues,
} from './InteractiveBankCard';
import FlowSteps from './FlowSteps';
import type { PlanId } from '@/lib/stripe';
import { IMAGES } from '@/lib/images';

function passwordScore(password: string): number {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return Math.min(score, 4);
}

export default function EnrollmentForm() {
  const t = useTranslations('pricing');
  const tErrors = useTranslations('errors');
  const locale = useLocale();

  const plan: PlanId = 'full';
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [card, setCard] = useState<BankCardValues>({
    number: '',
    expiry: '',
    cvc: '',
    holder: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptSubscription, setAcceptSubscription] = useState(false);
  const [acceptNoRefund, setAcceptNoRefund] = useState(false);
  const [acceptData, setAcceptData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [securePulse, setSecurePulse] = useState(false);
  const [error, setError] = useState('');

  const strength = passwordScore(password);
  const strengthLabel = [
    t('form.passwordStrengthWeak'),
    t('form.passwordStrengthFair'),
    t('form.passwordStrengthGood'),
    t('form.passwordStrengthStrong'),
    t('form.passwordStrengthStrong'),
  ][strength];

  const selected = useMemo(
    () => ({
      id: 'full' as const,
      name: t('plans.full.name'),
      price: t('plans.full.price'),
      trial: t('plans.full.badge'),
      benefits: t.raw('plans.full.benefits') as string[],
      cta: t('plans.full.cta'),
    }),
    [t]
  );

  const goToPayment = () => {
    setError('');
    if (!name.trim() || !email.trim() || !password) {
      setError(tErrors('required'));
      return;
    }
    if (password.length < 8) {
      setError(t('form.passwordTooShort'));
      return;
    }
    if (password !== confirmPassword) {
      setError(t('form.passwordMismatch'));
      return;
    }
    setStep(2);
    setSecurePulse(true);
    setTimeout(() => setSecurePulse(false), 1200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError(tErrors('required'));
      setStep(1);
      return;
    }
    if (password.length < 8) {
      setError(t('form.passwordTooShort'));
      setStep(1);
      return;
    }
    if (password !== confirmPassword) {
      setError(t('form.passwordMismatch'));
      setStep(1);
      return;
    }
    if (!isBankCardComplete(card)) {
      setError(t('form.cardInvalid'));
      return;
    }
    if (!acceptTerms || !acceptSubscription || !acceptNoRefund || !acceptData) {
      setError(tErrors('termsRequired'));
      return;
    }

    setLoading(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          plan,
          autoLogin: false,
          demoPayment: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || tErrors('paymentFailed'));
      }

      setCard({ number: '', expiry: '', cvc: '', holder: '' });
      setStep(3);
      setLoading(false);
    } catch (err) {
      const message =
        err instanceof Error && err.name === 'AbortError'
          ? t('form.timeout')
          : err instanceof Error
            ? err.message
            : tErrors('paymentFailed');
      setError(message);
      setLoading(false);
    } finally {
      clearTimeout(timeout);
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <Link
        href={`/${locale}`}
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand-dark"
      >
        <ArrowLeft className="h-4 w-4" />
        {locale === 'en' ? 'Back to home' : 'Volver al inicio'}
      </Link>

      <FlowSteps current="inscripcion" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 overflow-hidden rounded-[2rem] border border-brand/15 bg-white shadow-[0_40px_80px_-40px_rgba(11,18,32,0.45)]"
      >
        <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
          <aside className="relative hidden min-h-[520px] overflow-hidden bg-ink text-white lg:block">
            <Image
              src={IMAGES.enroll}
              alt=""
              fill
              className="object-cover opacity-45"
              sizes="480px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/85 to-brand/50" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(240,89,42,0.25),transparent_55%)]" />
            <div className="relative flex h-full flex-col justify-between p-8 xl:p-10">
              <div>
                <p className="font-display text-3xl font-extrabold tracking-tight">
                  Kit<span className="text-accent">Negocio</span>
                </p>
                <h2 className="mt-6 font-display text-3xl font-bold leading-tight xl:text-4xl">
                  {locale === 'en'
                    ? 'Full access in one secure checkout'
                    : 'Acceso completo en un checkout seguro'}
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
                  {locale === 'en'
                    ? 'Create your account, confirm payment once, and open your private library instantly.'
                    : 'Crea tu cuenta, confirma el pago una sola vez y abre tu biblioteca privada al instante.'}
                </p>
              </div>

              <ul className="space-y-3 text-sm text-white/75">
                {(selected.benefits.slice(0, 4) as string[]).map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                  {selected.name}
                </p>
                <p className="mt-2 font-display text-4xl font-bold">{selected.price}</p>
                <p className="mt-1 text-xs text-white/60">{selected.trial}</p>
              </div>
            </div>
          </aside>

          <div>
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-ink px-5 py-3.5 text-white md:px-7">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark">
                  <Lock className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold tracking-wide">{t('form.bankTitle')}</p>
                  <p className="hidden text-[11px] text-white/50 sm:block">{t('form.bankSubtitle')}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-100">
                <BadgeCheck className="h-3 w-3" />
                {t('form.encrypted')}
              </span>
            </div>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="bg-paper p-5 sm:p-7 md:p-8"
            >
              {step !== 3 && (
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
                      className={`flex flex-1 items-center gap-2.5 rounded-2xl border px-3 py-3 text-left transition-all ${
                        step === n
                          ? 'border-accent/40 bg-white shadow-sm ring-2 ring-accent/15'
                          : 'border-transparent bg-white/70 text-ink-soft hover:bg-white'
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold ${
                          step === n
                            ? 'bg-accent text-white'
                            : step > n
                              ? 'bg-brand text-white'
                              : 'bg-brand/10 text-brand'
                        }`}
                      >
                        {step > n ? <BadgeCheck className="h-4 w-4" /> : n}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-ink-faint">
                          {t('form.stepLabel', { n })}
                        </span>
                        <span className="flex items-center gap-1 truncate text-sm font-semibold text-ink">
                          <Icon className="h-3.5 w-3.5 shrink-0 text-brand" />
                          {label}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )}

              <AnimatePresence mode="wait">
                {step === 3 ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-6 text-center"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                      <CheckCircle2 className="h-9 w-9 text-emerald-600" />
                    </div>
                    <div>
                      <h1 className="font-display text-2xl font-bold text-ink md:text-3xl">
                        {t('form.successTitle')}
                      </h1>
                      <p className="mt-2 text-sm text-ink-soft">{t('form.successHint')}</p>
                    </div>
                    <Link href={`/${locale}/miembros`} className="btn-accent inline-flex w-full">
                      {t('form.enterSite')}
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                    <p className="text-xs text-ink-faint">{t('form.demoModeBadge')}</p>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div
                    key="personal"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-4"
                  >
                    <div className="rounded-2xl border border-brand/10 bg-white px-4 py-4 sm:px-5">
                      <h1 className="font-display text-xl font-bold text-ink md:text-2xl">
                        {t('form.personalTitle')}
                      </h1>
                      <p className="mt-1 text-sm text-ink-soft">{t('form.personalHint')}</p>
                      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white lg:hidden">
                        <div>
                          <p className="text-xs font-bold">{selected.name}</p>
                          <p className="text-[11px] text-emerald-300">{selected.trial}</p>
                        </div>
                        <p className="font-display text-2xl font-bold">{selected.price}</p>
                      </div>
                    </div>

                    <div className="grid gap-3 rounded-[1.5rem] border border-brand/10 bg-white p-4 shadow-sm sm:grid-cols-2 sm:p-5">
                      <div>
                        <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                          {t('form.name')}
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bank-input !py-2.5"
                          autoComplete="name"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                          {t('form.email')}
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bank-input !py-2.5"
                          autoComplete="email"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                          {t('form.phone')}
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="bank-input !py-2.5"
                          autoComplete="tel"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                          {t('form.password')}
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bank-input !py-2.5 pr-11"
                            autoComplete="new-password"
                            required
                            minLength={8}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-brand"
                            aria-label="Toggle password"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {password ? (
                          <div className="mt-2">
                            <div className="flex gap-1">
                              {[0, 1, 2, 3].map((i) => (
                                <span
                                  key={i}
                                  className={`h-1.5 flex-1 rounded-full ${
                                    i < strength
                                      ? strength <= 1
                                        ? 'bg-red-400'
                                        : strength === 2
                                          ? 'bg-amber-400'
                                          : 'bg-emerald-500'
                                      : 'bg-slate-200'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="mt-1 text-xs text-ink-faint">
                              {t('form.passwordStrength')}: {strengthLabel}
                            </p>
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                          {t('form.confirmPassword')}
                        </label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="bank-input !py-2.5"
                          autoComplete="new-password"
                          required
                          minLength={8}
                        />
                      </div>
                      <div className="flex items-center rounded-xl bg-brand-light px-3 py-2 text-xs text-brand-dark">
                        <ShieldCheck className="mr-2 h-4 w-4 shrink-0" />
                        {t('form.trustLine1')}
                      </div>
                    </div>

                    {error && step === 1 && (
                      <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>
                    )}

                    <button type="button" onClick={goToPayment} className="btn-accent w-full">
                      {t('form.continueToCard')}
                      <ArrowRight className="h-5 w-5" />
                    </button>
                    <p className="text-center text-[11px] text-ink-faint">{t('form.dueTodayHint')}</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-4"
                  >
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                      <p className="font-semibold text-ink">{t('form.demoModeBadge')}</p>
                      <p className="mt-1 text-slate-500">{t('form.demoModeHint')}</p>
                    </div>

                    <div
                      className={`rounded-[1.5rem] border p-1 transition-shadow ${
                        securePulse
                          ? 'border-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.2)]'
                          : 'border-brand/10'
                      }`}
                    >
                      <div className="rounded-[1.25rem] bg-white p-5 md:p-6">
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

                    <div className="rounded-[1.5rem] border border-brand/10 bg-white p-4 md:p-5">
                      <label className="mb-3 flex cursor-pointer items-center gap-3 rounded-xl bg-brand-light/60 px-3 py-2.5 text-sm font-semibold text-brand">
                        <input
                          type="checkbox"
                          checked={
                            acceptTerms && acceptSubscription && acceptNoRefund && acceptData
                          }
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setAcceptTerms(checked);
                            setAcceptSubscription(checked);
                            setAcceptNoRefund(checked);
                            setAcceptData(checked);
                          }}
                          className="rounded border-brand/30 text-brand focus:ring-brand"
                        />
                        <span>
                          {locale === 'en'
                            ? 'Accept all purchase conditions'
                            : 'Aceptar todas las condiciones de compra'}
                        </span>
                      </label>
                      <div className="grid gap-x-5 gap-y-2.5 sm:grid-cols-2">
                        <label className="flex items-start gap-2 text-xs text-ink-soft">
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

                        <label className="flex items-start gap-2 text-xs text-ink-soft">
                          <input
                            type="checkbox"
                            checked={acceptSubscription}
                            onChange={(e) => setAcceptSubscription(e.target.checked)}
                            className="mt-1 rounded border-brand/30 text-brand focus:ring-brand"
                            required
                          />
                          <span>{t('form.subscriptionLabel')}</span>
                        </label>

                        <label className="flex items-start gap-2 text-xs font-medium text-ink">
                          <input
                            type="checkbox"
                            checked={acceptNoRefund}
                            onChange={(e) => setAcceptNoRefund(e.target.checked)}
                            className="mt-1 rounded border-brand/30 text-brand focus:ring-brand"
                            required
                          />
                          <span>
                            {t('form.noRefundLabel')}{' '}
                            <Link
                              href={`/${locale}/terminos`}
                              className="font-semibold text-brand underline-offset-2 hover:underline"
                              target="_blank"
                            >
                              {t('form.termsLink')}
                            </Link>
                          </span>
                        </label>

                        <label className="flex items-start gap-2 text-xs text-ink-soft">
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
                            <Shield className="h-5 w-5" />
                            {t('form.paySecure')}
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-slate-200 pt-4 text-[11px] font-semibold text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Lock className="h-3.5 w-3.5 text-emerald-600" />
                        Canal cifrado
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-brand" />
                        Datos no almacenados
                      </span>
                      <span>Compra única $19.99</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
