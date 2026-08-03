'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, X } from 'lucide-react';
import { IMAGES } from '@/lib/images';

type Row = { label: string; agency: string; diy: string; kit: string };

export default function MarketEdge() {
  const t = useTranslations('marketEdge');
  const locale = useLocale();
  const rows = t.raw('rows') as Row[];

  const columns = [
    {
      key: 'agency',
      title: t('agency.title'),
      price: t('agency.price'),
      image: IMAGES.agencyContrast,
      tone: 'muted' as const,
    },
    {
      key: 'diy',
      title: t('diy.title'),
      price: t('diy.price'),
      image: IMAGES.diyChaos,
      tone: 'muted' as const,
    },
    {
      key: 'kit',
      title: t('kit.title'),
      price: t('kit.price'),
      image: IMAGES.kitClarity,
      tone: 'accent' as const,
    },
  ];

  return (
    <section id="market" className="relative overflow-hidden bg-[#071822] py-20 text-white md:py-28">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t('eyebrow')}</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">{t('title')}</h2>
          <p className="mt-4 text-lg text-white/70">{t('subtitle')}</p>
        </motion.div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {columns.map((col, i) => (
            <motion.article
              key={col.key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`overflow-hidden rounded-[1.75rem] border ${
                col.tone === 'accent'
                  ? 'border-accent/50 bg-white/[0.08] shadow-[0_30px_80px_-40px_rgba(240,89,42,0.7)]'
                  : 'border-white/10 bg-white/[0.04]'
              }`}
            >
              <div className="relative h-44">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071822] via-[#071822]/40 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <p className="font-display text-xl font-bold">{col.title}</p>
                  <p className={`mt-1 text-sm font-semibold ${col.tone === 'accent' ? 'text-accent' : 'text-white/60'}`}>
                    {col.price}
                  </p>
                </div>
              </div>

              <ul className="space-y-3 px-5 py-6">
                {rows.map((row) => {
                  const value = row[col.key as 'agency' | 'diy' | 'kit'];
                  const positive = col.key === 'kit' || value.startsWith('✓');
                  return (
                    <li key={`${col.key}-${row.label}`} className="flex items-start gap-3 text-sm">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          positive ? 'bg-emerald-400/20 text-emerald-300' : 'bg-white/10 text-white/45'
                        }`}
                      >
                        {positive ? <Check className="h-3 w-3" strokeWidth={3} /> : <X className="h-3 w-3" />}
                      </span>
                      <span className="text-white/80">
                        <span className="font-semibold text-white/95">{row.label}: </span>
                        {value.replace(/^[✓✗]\s*/, '')}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center gap-4 text-center"
        >
          <p className="max-w-2xl text-white/65">{t('closing')}</p>
          <Link href={`/${locale}/inscripcion`} className="btn-accent">
            {t('cta')}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
