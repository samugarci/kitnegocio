'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '@/lib/images';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#071018] sm:min-h-[92svh]">
      {/* Full-bleed visual plane */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease }}
      >
        <Image
          src={IMAGES.hero}
          alt=""
          fill
          priority
          quality={72}
          className="object-cover object-[68%_28%] sm:object-[72%_30%] lg:object-[78%_32%]"
          sizes="100vw"
        />
      </motion.div>

      {/* Atmospheric washes — keep photo real, not flat */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#061018]/55 via-[#061018]/35 to-[#061018] sm:bg-gradient-to-r sm:from-[#061018]/92 sm:via-[#061018]/55 sm:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#061018] via-transparent to-[#061018]/45" />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-40 mix-blend-overlay" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-brand/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/15 blur-[110px]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-12 pt-24 sm:min-h-[92svh] sm:justify-center sm:px-6 sm:pb-24 md:pt-28 lg:px-8">
        <div className="w-full max-w-[34rem]">
          <motion.p
            className="font-display text-[clamp(2.85rem,12vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-white"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          >
            Kit<span className="text-accent">Negocio</span>
          </motion.p>

          <motion.div
            className="mt-5 h-px w-14 origin-left bg-accent sm:mt-7 sm:w-16"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.35 }}
          />

          <motion.h1
            className="mt-5 max-w-[22ch] font-display text-[1.65rem] font-semibold leading-[1.15] tracking-[-0.025em] text-white sm:mt-6 sm:text-[2.05rem] md:text-[2.45rem]"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.22 }}
          >
            {t('title')}
          </motion.h1>

          <motion.p
            className="mt-4 max-w-[36ch] text-[15px] leading-[1.65] text-white/72 sm:mt-5 sm:text-[1.05rem] md:text-[1.1rem]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease, delay: 0.34 }}
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3.5 sm:mt-9 sm:flex-row sm:items-center sm:gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease, delay: 0.46 }}
          >
            <a
              href={`/${locale}/inscripcion`}
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-accent px-6 py-4 text-[15px] font-semibold text-white shadow-[0_18px_40px_-18px_rgba(240,89,42,0.85)] transition duration-300 hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-[0_22px_44px_-16px_rgba(240,89,42,0.9)] active:translate-y-0 sm:w-auto sm:px-8 sm:py-[1.05rem] sm:text-base"
            >
              {t('cta')}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 py-2 text-sm font-medium text-white/65 transition hover:text-white sm:justify-start"
            >
              {t('ctaSecondary')}
              <span aria-hidden className="text-accent">
                ↓
              </span>
            </a>
          </motion.div>

          <motion.p
            className="mt-6 text-[12px] tracking-wide text-white/40 sm:text-[13px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.62 }}
          >
            {t('trialNote')}
          </motion.p>
        </div>
      </div>

      {/* Soft bottom edge into trust bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink to-transparent" />
    </section>
  );
}
