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

const featureStyles = [
  { gradient: 'from-cyan-600 to-brand-dark', soft: 'bg-cyan-50', code: '01' },
  { gradient: 'from-violet-600 to-fuchsia-700', soft: 'bg-violet-50', code: '02' },
  { gradient: 'from-rose-500 to-accent-dark', soft: 'bg-rose-50', code: '03' },
  { gradient: 'from-emerald-500 to-emerald-800', soft: 'bg-emerald-50', code: '04' },
  { gradient: 'from-blue-600 to-indigo-800', soft: 'bg-blue-50', code: '05' },
  { gradient: 'from-amber-500 to-orange-700', soft: 'bg-amber-50', code: '06' },
  { gradient: 'from-slate-600 to-slate-900', soft: 'bg-slate-50', code: '07' },
  { gradient: 'from-brand to-cyan-900', soft: 'bg-cyan-50', code: '08' },
] as const;

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
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            {locale === 'en' ? 'Everything included' : 'Todo incluido'}
          </p>
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-sub">{t('subtitle')}</p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_KEYS.map((key, i) => {
            const Icon = featureIcons[i];
            const style = featureStyles[i];
            return (
              <motion.button
                key={key}
                type="button"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpenKey(key)}
                className="group relative flex min-h-[310px] flex-col overflow-hidden rounded-[1.4rem] border border-slate-200/90 bg-white text-left shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)] transition-all duration-300 hover:border-brand/30 hover:shadow-[0_26px_60px_-30px_rgba(14,116,144,0.45)] focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                {/* Miniatura visual del recurso */}
                <div className={`relative h-[128px] w-full overflow-hidden bg-gradient-to-br ${style.gradient}`}>
                  <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:22px_22px]" />
                  <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-white/15 blur-xl transition-transform duration-500 group-hover:scale-125" />

                  <span className="absolute left-4 top-4 font-mono text-[10px] font-bold tracking-[0.2em] text-white/60">
                    PACK / {style.code}
                  </span>
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-white backdrop-blur-md transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                  </span>

                  <FeatureCardVisual index={i} locale={locale} />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`rounded-md px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-brand ${style.soft}`}>
                      {locale === 'en' ? 'Editable resource' : 'Recurso editable'}
                    </span>
                  </div>
                  <h3 className="font-display text-[17px] font-bold leading-snug text-ink transition-colors group-hover:text-brand">
                    {t(`items.${key}`)}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-faint">
                    {t(`details.${key}.desc`)}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-brand">
                      <Play className="h-3.5 w-3.5 fill-brand" />
                      {locale === 'en' ? 'View demo' : 'Ver demostración'}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-light text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-ink-faint">
          {locale === 'en'
            ? 'Select any resource to open its interactive preview'
            : 'Selecciona cualquier recurso para abrir su vista previa interactiva'}
        </p>
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

function FeatureCardVisual({ index, locale }: { index: number; locale: string }) {
  const es = locale !== 'en';

  if (index === 0) {
    return (
      <div className="absolute bottom-0 left-4 flex items-end gap-1.5">
        {['-30%', 'TIP', '5★'].map((text, i) => (
          <motion.div
            key={text}
            className={`flex w-12 items-center justify-center rounded-t-lg border border-white/20 font-black text-white shadow-lg ${
              i === 1 ? 'h-14 bg-white/20 text-[9px]' : 'h-11 bg-black/15 text-[10px]'
            }`}
            whileHover={{ y: -4 }}
          >
            {text}
          </motion.div>
        ))}
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="absolute bottom-0 left-1/2 h-[82px] w-[54px] -translate-x-1/2 rounded-t-xl border-2 border-white/35 bg-black/20 p-1.5">
        <div className="flex h-full flex-col justify-end rounded-lg bg-white/10 p-1">
          <Play className="mx-auto mb-2 h-5 w-5 fill-white text-white" />
          <div className="h-1 rounded bg-white/70" />
          <div className="mt-1 h-1 w-2/3 rounded bg-white/40" />
        </div>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-end gap-1">
        {[es ? 'Antes' : 'Before', '2×1', 'CTA'].map((text, i) => (
          <div key={text} className={`w-10 rounded-t-lg border border-white/25 bg-white/15 p-1 text-center text-[7px] font-bold text-white ${i === 1 ? 'h-[72px]' : 'h-[58px]'}`}>
            <div className="mb-2 h-0.5 rounded bg-white/60" />
            {text}
          </div>
        ))}
      </div>
    );
  }

  if (index === 3) {
    return (
      <div className="absolute bottom-3 left-4 right-4 space-y-1.5">
        <div className="w-3/4 rounded-lg rounded-bl-sm bg-white/85 px-2 py-1.5 text-[7px] font-semibold text-emerald-900">
          {es ? 'Hola, ¿me envías precios?' : 'Hi, can you send prices?'}
        </div>
        <div className="ml-auto w-[82%] rounded-lg rounded-br-sm bg-[#d9fdd3] px-2 py-1.5 text-[7px] font-semibold text-emerald-950">
          {es ? 'Claro, tengo 3 opciones ✓✓' : 'Sure, I have 3 options ✓✓'}
        </div>
      </div>
    );
  }

  if (index === 4) {
    return (
      <div className="absolute bottom-3 left-4 right-4 overflow-hidden rounded-lg border border-white/20 bg-white/15 backdrop-blur">
        <div className="grid grid-cols-4 border-b border-white/15 px-2 py-1 text-center text-[6px] font-bold text-white/70">
          <span>L</span><span>M</span><span>V</span><span>D</span>
        </div>
        <div className="grid grid-cols-4 gap-1 p-2">
          {[0, 1, 2, 3].map((i) => <div key={i} className={`h-5 rounded ${i === 2 ? 'bg-accent' : 'bg-white/25'}`} />)}
        </div>
      </div>
    );
  }

  if (index === 5) {
    return (
      <div className="absolute bottom-3 left-4 right-4 rounded-xl bg-white/90 p-2.5 shadow-lg">
        <p className="text-[7px] font-bold text-ink">{es ? 'Caption listo ✨' : 'Ready caption ✨'}</p>
        <div className="mt-1.5 h-1 rounded bg-slate-200" />
        <div className="mt-1 h-1 w-4/5 rounded bg-slate-200" />
        <div className="mt-2 flex gap-1">
          {['#ventas', '#negocio'].map((tag) => <span key={tag} className="rounded bg-amber-100 px-1 py-0.5 text-[5px] font-bold text-amber-800">{tag}</span>)}
        </div>
      </div>
    );
  }

  if (index === 6) {
    return (
      <div className="absolute bottom-3 left-4 right-4 flex gap-1.5">
        {['ENE', 'FEB', 'MAR'].map((month, i) => (
          <div key={month} className={`flex h-14 flex-1 flex-col justify-between rounded-lg border border-white/15 p-2 text-white ${i === 2 ? 'bg-accent' : 'bg-white/10'}`}>
            <Archive className="h-3 w-3" />
            <span className="text-[6px] font-bold">{month}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="absolute bottom-3 left-4 right-4 rounded-xl border border-white/20 bg-white/90 p-2.5 shadow-lg">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white">
          <Mail className="h-3 w-3" />
        </div>
        <div className="flex-1">
          <div className="h-1.5 w-3/4 rounded bg-slate-300" />
          <div className="mt-1.5 h-1 w-full rounded bg-slate-200" />
          <div className="mt-1 h-1 w-2/3 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
