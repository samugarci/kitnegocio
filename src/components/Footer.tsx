'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Mail,
  ArrowRight,
  Lock,
  ShieldCheck,
  CreditCard,
  EyeOff,
  Globe2,
  Headphones,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import Logo, { LogoMark } from './Logo';

export default function Footer() {
  const t = useTranslations('footer');
  const tLegal = useTranslations('legal');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'soporte@kitnegocio.com';

  if (pathname.includes('/admin')) return null;

  const securityItems = [
    {
      icon: Lock,
      label: t('securitySsl'),
      detail: t('securitySslDetail'),
      color: 'text-cyan-200',
      bg: 'bg-cyan-300/10',
    },
    {
      icon: CreditCard,
      label: t('securityPay'),
      detail: t('securityPayDetail'),
      color: 'text-emerald-200',
      bg: 'bg-emerald-300/10',
    },
    {
      icon: ShieldCheck,
      label: t('securityPrivate'),
      detail: t('securityPrivateDetail'),
      color: 'text-sky-200',
      bg: 'bg-sky-300/10',
    },
    {
      icon: EyeOff,
      label: t('securityData'),
      detail: t('securityDataDetail'),
      color: 'text-violet-200',
      bg: 'bg-violet-300/10',
    },
  ];

  const legalLinks = [
    { href: 'terminos', label: tLegal('terms'), featured: true },
    { href: 'privacidad', label: tLegal('privacy') },
    { href: 'cookies', label: tLegal('cookies') },
    { href: 'aviso-legal', label: tLegal('legalNotice') },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#07111f] text-white">
      <div className="pointer-events-none absolute inset-0 bg-mesh-legal opacity-70" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="relative mb-10 overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-r from-brand/25 via-white/[0.06] to-accent/15 p-6 shadow-2xl shadow-black/20 md:p-8">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.10),transparent_65%)]" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">
                <CheckCircle2 className="h-4 w-4" />
                {t('ctaEyebrow')}
              </p>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                {t('ctaTitle')}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/65">
                {t('description')}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-2 md:items-end">
              <p className="text-xs font-medium text-white/50">{t('onePayment')}</p>
              <a href={`/${locale}/inscripcion`} className="btn-accent !rounded-xl !px-6 !py-3.5">
                {tNav('enroll')}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 lg:col-span-5">
            <Logo inverted markClassName="h-10 w-10" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
              {t('brandStatement')}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/65">
                <Globe2 className="h-3.5 w-3.5 text-cyan-200" />
                {t('address')}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-3 py-1.5 text-xs text-emerald-100/80">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {t('verified')}
              </span>
            </div>
            <p className="mt-5 text-xs text-white/35">{t('company')}</p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 lg:col-span-3">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-white/90">
              {tLegal('legalNotice')}
            </h3>
            <nav className="space-y-1" aria-label={tLegal('legalNotice')}>
              {legalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}/${item.href}`}
                  className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${
                    item.featured
                      ? 'bg-accent/10 font-semibold text-orange-200'
                      : 'text-white/55 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4 opacity-35 transition group-hover:translate-x-0.5 group-hover:opacity-80" />
                </Link>
              ))}
            </nav>
            <p className="mt-3 border-t border-white/[0.07] pt-3 text-[11px] leading-relaxed text-white/35">
              {t('digitalNotice')}
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 lg:col-span-4">
            <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand/20 text-cyan-100">
              <Headphones className="h-5 w-5" />
            </span>
            <h3 className="font-display text-lg font-bold">{t('contactTitle')}</h3>
            <p className="mt-1 text-sm text-white/50">{t('contactHint')}</p>
            <a
              href={`mailto:${supportEmail}`}
              className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-black/15 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/30 hover:bg-white/[0.06]"
            >
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {supportEmail}
              </span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
              <Link href={`/${locale}/miembros`} className="text-white/70 hover:text-white">
                {tNav('members')}
              </Link>
              <Link href={`/${locale}/soporte`} className="text-white/70 hover:text-white">
                {tNav('support')}
              </Link>
              <a href={`/${locale}/inscripcion`} className="text-white/70 hover:text-white">
                {tNav('enroll')}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-emerald-300/10 bg-gradient-to-r from-emerald-300/[0.055] via-white/[0.025] to-cyan-300/[0.055] p-5 md:p-6">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-white">
                <ShieldCheck className="h-5 w-5 text-emerald-300" />
                {t('securityTitle')}
              </p>
              <p className="mt-1 text-xs text-white/45">{t('securitySubtitle')}</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.08] px-3 py-1 text-[11px] font-semibold text-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.8)]" />
              {t('protectionActive')}
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {securityItems.map(({ icon: Icon, label, detail, color, bg }) => (
              <div
                key={label}
                className="group rounded-xl border border-white/[0.07] bg-black/15 p-4 transition hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.045]"
              >
                <span className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${bg}`}>
                  <Icon className={`h-4.5 w-4.5 ${color}`} aria-hidden />
                </span>
                <p className="text-xs font-semibold text-white/85">{label}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-white/40">{detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/[0.08] pt-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} KitNegocio. {t('rights')}</p>
          <div className="flex items-center gap-2">
            <LogoMark className="h-5 w-5 opacity-70" />
            <span>{t('footerTagline')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
