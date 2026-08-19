'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from '@/components/brand/Logo';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const isAdmin = pathname.includes('/admin');
  const isMembers = pathname.includes('/miembros');
  const overHero = isHome && !scrolled && !mobileOpen;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  if (isAdmin || isMembers) return null;

  const links = [
    { href: isHome ? '#features' : `/${locale}#features`, label: t('features') },
    { href: isHome ? '#how-it-works' : `/${locale}#how-it-works`, label: t('howItWorks') },
    { href: isHome ? '#pricing' : `/${locale}#pricing`, label: t('pricing') },
    { href: isHome ? '#faq' : `/${locale}#faq`, label: t('faq') },
    { href: `/${locale}/soporte`, label: t('support') },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          overHero
            ? 'border-b border-transparent bg-transparent'
            : 'border-b border-slate-200/60 bg-white/90 backdrop-blur-xl'
        }`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[3.75rem] sm:px-6 lg:px-8">
          <Link href={`/${locale}`} aria-label="KitNegocio" className="relative z-10 min-w-0 shrink">
            <Logo
              markClassName="h-8 w-8 sm:h-8 sm:w-8"
              className="gap-2"
              compact
              inverted={overHero}
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
            <div className="flex items-center gap-7">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] font-medium tracking-wide transition ${
                    overHero
                      ? 'text-white/65 hover:text-white'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <LanguageSwitcher light={overHero} />

              <span
                className={`h-4 w-px ${overHero ? 'bg-white/20' : 'bg-slate-200'}`}
                aria-hidden
              />

              {!isMembers && (
                <a
                  href={`/${locale}/miembros`}
                  className={`text-[13px] font-medium tracking-wide transition ${
                    overHero
                      ? 'text-white/80 hover:text-white'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {t('login')}
                </a>
              )}

              {!isMembers && (
                <a
                  href={`/${locale}/inscripcion`}
                  className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-[13px] font-semibold tracking-wide transition duration-300 ${
                    overHero
                      ? 'bg-white text-ink hover:bg-white/90'
                      : 'bg-ink text-white hover:bg-ink/90'
                  }`}
                >
                  {t('enroll')}
                </a>
              )}
            </div>
          </nav>

          <div className="flex shrink-0 items-center gap-1 lg:hidden">
            {!isMembers && (
              <a
                href={`/${locale}/miembros`}
                className={`hidden items-center px-2.5 py-2 text-[12px] font-semibold tracking-wide sm:inline-flex ${
                  overHero ? 'text-white/85' : 'text-ink-soft'
                }`}
              >
                {t('login')}
              </a>
            )}
            <LanguageSwitcher light={overHero} compact />
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                overHero
                  ? 'text-white hover:bg-white/10'
                  : 'text-ink hover:bg-slate-100'
              }`}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-100 bg-white px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 lg:hidden">
            <nav className="space-y-0.5" aria-label="Móvil">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-3 py-3.5 text-[15px] font-medium text-ink-soft transition hover:bg-slate-50 hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {!isMembers && (
              <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4">
                <a
                  href={`/${locale}/miembros`}
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-[14px] font-semibold text-ink transition hover:bg-slate-50"
                >
                  {t('login')}
                </a>
                <a
                  href={`/${locale}/inscripcion`}
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-between rounded-xl bg-ink px-5 py-3.5 text-[14px] font-semibold text-white"
                >
                  <span>{t('enroll')}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        )}
      </header>
      {!isHome && <div className="h-14 sm:h-[3.75rem]" aria-hidden />}
    </>
  );
}
