'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
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
      setVisible(window.scrollY > 520);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-40 md:bottom-6 md:left-auto md:right-6 md:w-auto"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-brand/15 bg-ink/95 p-3 pl-4 text-white shadow-[0_20px_50px_-20px_rgba(11,18,32,0.7)] backdrop-blur-md">
            <div className="min-w-0 flex-1">
              <p className="truncate font-sans text-sm font-semibold tabular-nums">
                {tPricing('floatingFrom')}
              </p>
              <p className="truncate text-xs text-white/65">{tPricing('floatingTrial')}</p>
            </div>
            <a href={`/${locale}#pricing`} className="btn-accent !px-4 !py-2.5 !text-sm shrink-0">
              {t('cta')}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
