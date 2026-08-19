'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';

export default function FloatingCTA() {
  const t = useTranslations('hero');
  const tPricing = useTranslations('pricing');
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (dismissed) return;
      setVisible(window.scrollY > 420);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-3 right-3 z-40 md:bottom-6 md:left-auto md:right-6 md:w-auto">
      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-ink/95 p-2.5 pl-3.5 text-white shadow-xl backdrop-blur-md sm:gap-3 sm:p-3 sm:pl-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{tPricing('floatingFrom')}</p>
          <p className="truncate text-[11px] text-white/65 sm:text-xs">
            {tPricing('noRefundsShort')}
          </p>
        </div>
        <a
          href={`/${locale}/inscripcion`}
          className="btn-accent !shrink-0 !rounded-xl !px-3.5 !py-2.5 !text-xs sm:!px-4 sm:!text-sm"
        >
          <span className="sm:hidden">{locale === 'en' ? 'Buy' : 'Comprar'}</span>
          <span className="hidden sm:inline">{t('cta')}</span>
          <ArrowRight className="h-4 w-4" />
        </a>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
