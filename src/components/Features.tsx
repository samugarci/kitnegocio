'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Images,
  Clapperboard,
  Sparkles,
  MessageCircle,
  CalendarDays,
  Type,
  Archive,
  Mail,
  X,
  Play,
  Check,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { FEATURE_KEYS, type FeatureKey } from '@/lib/featureMedia';
import FeatureLiveDemo from './FeatureLiveDemo';
import FeatureVideoDemo from './FeatureVideoDemo';

const featureIcons = [
  Images,
  Clapperboard,
  Sparkles,
  MessageCircle,
  CalendarDays,
  Type,
  Archive,
  Mail,
];

export default function Features() {
  const t = useTranslations('features');
  const locale = useLocale();
  const [openKey, setOpenKey] = useState<FeatureKey | null>(null);

  useEffect(() => {
    if (!openKey) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenKey(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [openKey]);

  const openIndex = openKey ? FEATURE_KEYS.indexOf(openKey) : -1;
  const OpenIcon = openIndex >= 0 ? featureIcons[openIndex] : null;
  const bullets =
    openKey ? ((t.raw(`details.${openKey}.bullets`) as string[]) || []) : [];

  return (
    <section id="features" className="page-shell py-20 md:py-28">
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-sub">{t('subtitle')}</p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_KEYS.map((key, i) => {
            const Icon = featureIcons[i];
            return (
              <motion.button
                key={key}
                type="button"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpenKey(key)}
                className="group relative overflow-hidden rounded-2xl border border-brand/10 bg-white p-6 text-left shadow-sm transition-shadow hover:border-brand/30 hover:shadow-[0_20px_40px_-24px_rgba(14,116,144,0.4)]"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/10 transition-transform group-hover:scale-150" />
                <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand text-white transition-colors group-hover:bg-accent">
                  <Icon className="h-7 w-7" strokeWidth={1.6} />
                </div>
                <h3 className="relative font-display text-lg font-bold text-ink">
                  {t(`items.${key}`)}
                </h3>
                <p className="relative mt-3 flex items-center gap-1 text-sm font-medium text-brand">
                  <Play className="h-3.5 w-3.5 fill-brand" />
                  {t('tapHint')}
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {openKey && OpenIcon && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
              aria-label={t('close')}
              onClick={() => setOpenKey(null)}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-paper shadow-2xl sm:rounded-3xl"
            >
              <div className="flex items-center justify-between border-b border-brand/10 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
                    <OpenIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold text-ink">
                      {t(`details.${openKey}.title`)}
                    </p>
                    <p className="text-xs text-ink-faint">{t(`items.${openKey}`)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenKey(null)}
                  className="rounded-xl p-2 text-ink-soft hover:bg-brand-light hover:text-brand"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="overflow-y-auto">
                <div className="grid gap-0 md:grid-cols-2">
                  {/* Demo animada tipo video — siempre funciona offline */}
                  <FeatureVideoDemo
                    featureKey={openKey}
                    locale={locale}
                    label={t('watchVideo')}
                  />

                  {/* Ejemplo en vivo mockup */}
                  <div className="relative min-h-[260px] md:min-h-[300px]">
                    <FeatureLiveDemo featureKey={openKey} locale={locale} />
                    <span className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-lg bg-ink/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">
                      {t('liveExample')}
                    </span>
                  </div>
                </div>

                <div className="space-y-5 p-6 md:p-8">
                  <p className="text-lg leading-relaxed text-ink-soft">
                    {t(`details.${openKey}.desc`)}
                  </p>

                  <div className="rounded-2xl border border-accent/20 bg-accent-light p-4">
                    <p className="text-sm font-semibold text-accent-dark">{t('liveExample')}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink">
                      {t(`details.${openKey}.example`)}
                    </p>
                  </div>

                  <ul className="space-y-2">
                    {bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm text-ink-soft">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand-light">
                          <Check className="h-3.5 w-3.5 text-brand" />
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/${locale}/inscripcion`}
                    className="btn-accent w-full text-center sm:w-auto"
                    onClick={() => setOpenKey(null)}
                  >
                    {t('cta')}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
