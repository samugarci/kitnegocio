'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Mail, ArrowRight } from 'lucide-react';
import Logo, { LogoMark } from './Logo';

export default function Footer() {
  const t = useTranslations('footer');
  const tLegal = useTranslations('legal');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'soporte@kitnegocio.com';

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 bg-mesh-legal opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 md:flex-row md:items-center">
          <div>
            <Logo inverted markClassName="h-10 w-10" />
            <p className="mt-3 max-w-md text-white/70">{t('description')}</p>
          </div>
          <Link href={`/${locale}/inscripcion`} className="btn-accent shrink-0">
            {tNav('enroll')}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <LogoMark className="h-8 w-8" />
              <span className="font-display text-lg font-bold">KitNegocio</span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">{t('company')}</p>
            <p className="text-sm text-white/60">{t('address')}</p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">{tLegal('legalNotice')}</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href={`/${locale}/terminos`} className="hover:text-accent">
                  {tLegal('terms')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacidad`} className="hover:text-accent">
                  {tLegal('privacy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/cookies`} className="hover:text-accent">
                  {tLegal('cookies')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/aviso-legal`} className="hover:text-accent">
                  {tLegal('legalNotice')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">{t('contact')}</h3>
            <a
              href={`mailto:${supportEmail}`}
              className="flex items-center gap-2 text-sm text-accent hover:underline"
            >
              <Mail className="h-4 w-4" />
              {supportEmail}
            </a>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link href={`/${locale}/miembros`} className="text-white/70 hover:text-white">
                {tNav('members')}
              </Link>
              <Link href={`/${locale}/soporte`} className="text-white/70 hover:text-white">
                {tNav('support')}
              </Link>
              <Link href={`/${locale}/inscripcion`} className="text-white/70 hover:text-white">
                {tNav('enroll')}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          © {new Date().getFullYear()} KitNegocio. {t('rights')}
        </div>
      </div>
    </footer>
  );
}
