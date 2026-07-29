'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

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

  const saveConsent = (value: string) => {
    localStorage.setItem('cookie-consent', value);
    localStorage.setItem('cookie-analytics', analytics ? 'true' : 'false');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:bottom-6 md:left-6 md:right-auto md:max-w-lg">
      <div className="rounded-2xl border border-brand/15 bg-paper/95 p-5 shadow-[0_20px_50px_-20px_rgba(26,35,50,0.45)] backdrop-blur-md">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          <div>
            <p className="text-sm text-ink-soft">
              {t('message')}{' '}
              <Link href={`/${locale}/cookies`} className="font-medium text-brand hover:underline">
                {t('policy')}
              </Link>
              .
            </p>
            {showConfig && (
              <label className="mt-3 flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="rounded border-brand/30 text-brand focus:ring-brand"
                />
                Cookies analíticas (opcionales)
              </label>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={() => saveConsent('rejected')} className="btn-secondary !px-4 !py-2 !text-sm">
            {t('reject')}
          </button>
          <button
            onClick={() => (showConfig ? saveConsent('configured') : setShowConfig(true))}
            className="btn-secondary !px-4 !py-2 !text-sm"
          >
            {t('configure')}
          </button>
          <button onClick={() => saveConsent('accepted')} className="btn-primary !px-4 !py-2 !text-sm">
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
