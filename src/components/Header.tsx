'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: isHome ? '#features' : `/${locale}#features`, label: t('features') },
    { href: isHome ? '#how-it-works' : `/${locale}#how-it-works`, label: t('howItWorks') },
    { href: isHome ? '#pricing' : `/${locale}#pricing`, label: t('pricing') },
    { href: isHome ? '#faq' : `/${locale}#faq`, label: t('faq') },
    { href: `/${locale}/miembros`, label: t('members') },
    { href: `/${locale}/soporte`, label: t('support') },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'border-slate-200/80 bg-white/95 shadow-[0_8px_30px_-18px_rgba(15,23,42,0.35)] backdrop-blur-md'
          : 'border-slate-200/60 bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-6">
        <Link href={`/${locale}`} className="group" aria-label="KitNegocio">
          <Logo inverted={false} />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {links.map((link) => {
            const active =
              pathname.startsWith(link.href.split('#')[0]) &&
              link.href.includes('/') &&
              !link.href.includes('#');
            return (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  active
                    ? 'bg-brand-light text-brand'
                    : 'text-ink-soft hover:bg-slate-100 hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="ml-2 flex items-center gap-3">
            <LanguageSwitcher light={false} />
            <Link href={`/${locale}#pricing`} className="btn-primary !px-5 !py-2.5 !text-sm">
              {t('enroll')}
            </Link>
          </div>
        </nav>

        <div className="flex items-center gap-3 xl:hidden">
          <LanguageSwitcher light={false} />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl p-2 text-ink hover:bg-slate-100"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-200 bg-white px-4 py-4 xl:hidden"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 font-medium text-ink-soft hover:text-brand"
              >
                {link.label}
              </a>
            ))}
            <Link
              href={`/${locale}#pricing`}
              className="btn-primary mt-3 w-full !text-base"
              onClick={() => setMobileOpen(false)}
            >
              {t('enroll')}
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
