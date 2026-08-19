'use client';

import { useMemo, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  CreditCard,
  Ban,
  MessageCircle,
  Palette,
  FolderOpen,
  Layers,
  HelpCircle,
  Search,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

type FaqItem = { q: string; a: string };

const ICONS = [Layers, CreditCard, Ban, MessageCircle, Palette, FolderOpen] as const;

export default function FAQ() {
  const t = useTranslations('faq');
  const locale = useLocale();
  const items = t.raw('items') as FaqItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState('');
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.map((item, index) => ({ item, index }));
    return items
      .map((item, index) => ({ item, index }))
      .filter(
        ({ item }) =>
          item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
      );
  }, [items, query]);

  return (
    <section id="faq" className="relative overflow-hidden bg-paper-warm py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 55% 40% at 8% 10%, rgba(14,116,144,0.10), transparent), radial-gradient(ellipse 45% 35% at 92% 88%, rgba(240,89,42,0.08), transparent)',
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        <div className="mb-12 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <HelpCircle className="h-3.5 w-3.5" />
              {t('badge')}
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
              {t('title')}
            </h2>
            <p className="mt-4 max-w-lg text-lg text-ink-soft">{t('subtitle')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="relative"
          >
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-ink shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/15"
              aria-label={t('searchPlaceholder')}
            />
          </motion.div>
        </div>

        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-dashed border-brand/20 bg-white/70 px-6 py-10 text-center"
              >
                <p className="font-medium text-ink">{t('noResults')}</p>
                <p className="mt-1 text-sm text-ink-soft">{t('noResultsHint')}</p>
              </motion.div>
            )}

            {filtered.map(({ item, index: i }, visibleIndex) => {
              const Icon = ICONS[i % ICONS.length];
              const isOpen = openIndex === i;
              const isHot = hovered === i || isOpen;

              return (
                <motion.div
                  key={item.q}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: visibleIndex * 0.04 }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? 'border-brand/30 shadow-[0_20px_48px_-28px_rgba(14,116,144,0.45)] ring-1 ring-brand/15'
                      : isHot
                        ? 'border-brand/20 shadow-md'
                        : 'border-slate-200/90 shadow-sm'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start gap-4 p-5 text-left md:p-6"
                  >
                    <span
                      className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                        isOpen
                          ? 'bg-brand text-white shadow-sm'
                          : 'bg-brand-light text-brand group-hover:bg-brand/15'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-semibold text-ink-faint">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {i === 0 && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent">
                            <Sparkles className="h-3 w-3" />
                            {t('popularTag')}
                          </span>
                        )}
                      </span>
                      <span
                        className={`mt-1 block text-base font-semibold leading-snug transition-colors md:text-lg ${
                          isOpen ? 'text-brand-dark' : 'text-ink'
                        }`}
                      >
                        {item.q}
                      </span>
                    </span>

                    <span
                      className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? 'rotate-180 border-brand bg-brand text-white'
                          : 'border-slate-200 bg-slate-50 text-brand'
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="border-t border-slate-100 px-5 pb-6 pt-1 md:px-6">
                          <div className="ml-0 rounded-xl bg-gradient-to-br from-brand-light/80 to-white p-4 md:ml-[3.75rem]">
                            <p className="leading-relaxed text-ink-soft">{item.a}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 overflow-hidden rounded-2xl border border-brand/15 bg-gradient-to-r from-[#071822] to-brand-dark p-6 text-white md:flex md:items-center md:justify-between md:gap-6 md:p-8"
        >
          <div>
            <p className="font-display text-xl font-bold md:text-2xl">{t('ctaTitle')}</p>
            <p className="mt-2 max-w-md text-sm text-white/70">{t('ctaHint')}</p>
          </div>
          <Link
            href={`/${locale}/soporte`}
            className="btn-accent mt-5 shrink-0 !bg-white !text-ink hover:!bg-brand-light md:mt-0"
          >
            {t('ctaButton')}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
