'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Cookie, ShieldCheck } from 'lucide-react';

export default function CookieBanner() {
  const t = useTranslations('cookies');
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const saveConsent = (value: 'accepted' | 'rejected' | 'configured') => {
    const analyticsEnabled = value === 'accepted' ? true : value === 'configured' ? analytics : false;
    localStorage.setItem('cookie-consent', value);
    localStorage.setItem('cookie-analytics', analyticsEnabled ? 'true' : 'false');
    localStorage.setItem('cookie-consent-at', new Date().toISOString());
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:bottom-6 md:left-6 md:right-auto md:max-w-xl">
      <div className="overflow-hidden rounded-2xl border border-brand/15 bg-paper/97 shadow-[0_24px_60px_-24px_rgba(26,35,50,0.55)] backdrop-blur-md">
        <div className="border-b border-brand/10 bg-brand-light/40 px-5 py-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-brand">
            <ShieldCheck className="h-3.5 w-3.5" />
            {locale === 'en' ? 'Privacy & cookies' : 'Privacidad y cookies'}
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start gap-3">
            <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
            <div>
              <p className="text-sm leading-relaxed text-ink-soft">
                {t('message')}{' '}
                <Link href={`/${locale}/cookies`} className="font-semibold text-brand hover:underline">
                  {t('policy')}
                </Link>
                {' · '}
                <Link href={`/${locale}/privacidad`} className="font-semibold text-brand hover:underline">
                  {locale === 'en' ? 'Privacy Policy' : 'Política de Privacidad'}
                </Link>
                .
              </p>
              <p className="mt-2 text-xs text-ink-faint">
                {locale === 'en'
                  ? 'Essential cookies are always required for language and secure session.'
                  : 'Las cookies esenciales siempre son necesarias para el idioma y la sesión segura.'}
              </p>
              {showConfig && (
                <label className="mt-3 flex items-start gap-2 rounded-xl border border-brand/10 bg-white px-3 py-3 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="mt-0.5 rounded border-brand/30 text-brand focus:ring-brand"
                  />
                  <span>
                    <span className="font-semibold">
                      {locale === 'en' ? 'Analytics cookies (optional)' : 'Cookies analíticas (opcionales)'}
                    </span>
                    <span className="mt-0.5 block text-xs text-ink-faint">
                      {locale === 'en'
                        ? 'Help us understand aggregated usage. No advertising cookies.'
                        : 'Nos ayudan a entender el uso agregado. Sin cookies publicitarias.'}
                    </span>
                  </span>
                </label>
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => saveConsent('rejected')}
              className="btn-secondary !px-4 !py-2 !text-sm"
            >
              {t('reject')}
            </button>
            <button
              type="button"
              onClick={() => (showConfig ? saveConsent('configured') : setShowConfig(true))}
              className="btn-secondary !px-4 !py-2 !text-sm"
            >
              {showConfig
                ? locale === 'en'
                  ? 'Save preferences'
                  : 'Guardar preferencias'
                : t('configure')}
            </button>
            <button
              type="button"
              onClick={() => saveConsent('accepted')}
              className="btn-primary !px-4 !py-2 !text-sm"
            >
              {t('accept')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
