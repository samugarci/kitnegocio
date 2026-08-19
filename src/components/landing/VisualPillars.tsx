'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '@/lib/images';

type Pillar = {
  key: string;
  image: string;
  alt: string;
};

const PILLARS: Pillar[] = [
  {
    key: 'feed',
    image: IMAGES.studioDesk,
    alt: 'Diseño de feed de Instagram profesional',
  },
  {
    key: 'reels',
    image: IMAGES.reelsShoot,
    alt: 'Grabación de Reels y Stories',
  },
  {
    key: 'whatsapp',
    image: IMAGES.whatsappChat,
    alt: 'Conversación de venta por WhatsApp Business',
  },
];

export default function VisualPillars() {
  const t = useTranslations('visualPillars');
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-paper py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-mesh-legal opacity-70" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">{t('eyebrow')}</p>
          <h2 className="section-title mt-3">{t('title')}</h2>
          <p className="section-sub">{t('subtitle')}</p>
        </motion.div>

        <div className="mt-14 space-y-16 md:space-y-24">
          {PILLARS.map((pillar, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.article
                key={pillar.key}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(11,18,32,0.45)]">
                  <Image
                    src={pillar.image}
                    alt={pillar.alt}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-ink/35 via-transparent to-brand/20" />
                  <span className="absolute left-5 top-5 rounded-xl bg-white/90 px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-ink backdrop-blur">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
                    {t(`${pillar.key}.title`)}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-ink-soft">{t(`${pillar.key}.desc`)}</p>
                  <ul className="mt-6 space-y-3">
                    {(t.raw(`${pillar.key}.bullets`) as string[]).map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-[15px] text-ink-soft">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center">
          <Link href={`/${locale}/inscripcion`} className="btn-accent">
            {t('cta')}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
