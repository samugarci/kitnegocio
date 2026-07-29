'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, RefreshCw, Images, Clapperboard, MessageCircle } from 'lucide-react';
import { IMAGES } from '@/lib/images';

const tiles = [
  { id: 'posts', icon: Images, labelEs: '30 posts', labelEn: '30 posts', color: 'from-brand to-brand-dark' },
  { id: 'reels', icon: Clapperboard, labelEs: '12 Reels', labelEn: '12 Reels', color: 'from-accent to-accent-dark' },
  { id: 'wa', icon: MessageCircle, labelEs: 'WhatsApp', labelEn: 'WhatsApp', color: 'from-cyan-600 to-brand' },
] as const;

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const [activeTile, setActiveTile] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  return (
    <section ref={ref} className="relative min-h-[92vh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={IMAGES.hero}
          alt="Persona creando contenido en el móvil para redes"
          fill
          priority
          className="object-cover object-[center_30%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-brand/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative mx-auto grid min-h-[92vh] max-w-7xl items-end gap-10 px-4 pb-16 pt-24 md:items-center md:grid-cols-2 md:px-6 md:pb-24 md:pt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            Kit<span className="text-accent">Negocio</span>
          </p>

          <h1 className="font-display text-3xl font-bold leading-[1.12] text-white md:text-4xl lg:text-[2.75rem]">
            {t('title')}
          </h1>

          <p className="mt-5 max-w-lg text-lg text-white/80 md:text-xl">{t('subtitle')}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#pricing" className="btn-accent group">
              {t('cta')}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#preview"
              className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
            >
              {t('ctaSecondary')}
            </a>
          </div>

          <p className="mt-5 flex items-center gap-2 text-sm text-white/70">
            <RefreshCw className="h-4 w-4 text-accent" />
            {t('trialNote')}
          </p>
        </motion.div>

        {/* Panel interactivo del pack */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative hidden md:block"
        >
          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-white/90">Pack del mes</p>
              <span className="rounded-lg bg-accent px-2.5 py-1 text-xs font-bold text-white">
                desde $11.99
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {tiles.map((tile, i) => {
                const Icon = tile.icon;
                const active = activeTile === i;
                return (
                  <button
                    key={tile.id}
                    type="button"
                    onMouseEnter={() => setActiveTile(i)}
                    onClick={() => setActiveTile(i)}
                    className={`interactive-tile text-left ${active ? 'border-accent/70 bg-white/15 ring-2 ring-accent/40' : ''}`}
                  >
                    <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${tile.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-xs font-semibold text-white">
                      {locale === 'en' ? tile.labelEn : tile.labelEs}
                    </p>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTile}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-4 overflow-hidden rounded-2xl"
              >
                <div className="relative h-44">
                  <Image
                    src={activeTile === 0 ? IMAGES.invoice : activeTile === 1 ? IMAGES.calendar : IMAGES.proposal}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <p className="absolute bottom-3 left-3 text-sm font-medium text-white">
                    {locale === 'en'
                      ? ['Feed ready to edit', 'Reels scripts included', 'WhatsApp sales messages'][activeTile]
                      : ['Feed listo para editar', 'Guiones de Reels incluidos', 'Mensajes de venta WhatsApp'][activeTile]}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <Link
              href={`/${locale}/inscripcion`}
              className="btn-primary mt-4 w-full !bg-white !py-3 !text-base !text-ink hover:!bg-brand-light"
            >
              {t('cta')}
            </Link>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-4 top-8 rounded-2xl border border-white/20 bg-ink/80 px-3 py-2 text-xs font-semibold text-white backdrop-blur"
          >
            + biblioteca histórica
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
