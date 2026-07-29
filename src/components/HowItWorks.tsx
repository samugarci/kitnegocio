'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CreditCard, Download, PenLine, ArrowRight } from 'lucide-react';

const steps = [
  { key: 'step1' as const, icon: CreditCard },
  { key: 'step2' as const, icon: Download },
  { key: 'step3' as const, icon: PenLine },
];

export default function HowItWorks() {
  const t = useTranslations('howItWorks');

  return (
    <section id="how-it-works" className="bg-brand py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-center text-3xl font-bold md:text-4xl lg:text-5xl"
        >
          {t('title')}
        </motion.h2>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {steps.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute left-[60%] top-8 hidden h-0.5 w-[80%] bg-white/20 md:block" />
              )}
              <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                <Icon className="h-8 w-8" />
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-xs font-bold">
                  {i + 1}
                </span>
              </div>
              <h3 className="mb-3 font-display text-xl font-bold">{t(`${key}.title`)}</h3>
              <p className="text-white/75">{t(`${key}.desc`)}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#pricing" className="btn-accent">
            {t('cta')}
            <ArrowRight className="h-5 w-5" />
          </a>
          <p className="mt-5 text-sm text-white/65">{t('trust')}</p>
        </div>
      </div>
    </section>
  );
}
