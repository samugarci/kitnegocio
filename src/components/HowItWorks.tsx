'use client';

import { useTranslations, useLocale } from 'next-intl';
import { CreditCard, Download, PenLine, ArrowRight } from 'lucide-react';

const steps = [
  { key: 'step1' as const, icon: CreditCard },
  { key: 'step2' as const, icon: Download },
  { key: 'step3' as const, icon: PenLine },
];

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const locale = useLocale();

  return (
    <section id="how-it-works" className="bg-brand py-12 text-white sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[1.75rem] font-bold leading-tight sm:text-3xl md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/75 sm:text-lg">{t('subtitle')}</p>
        </div>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-3">
          {steps.map(({ key, icon: Icon }, i) => (
            <div
              key={key}
              className="rounded-2xl border border-white/15 bg-white/10 p-5 sm:p-6"
            >
              <div className="mb-3 flex items-center justify-between sm:mb-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold sm:text-xl">{t(`${key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{t(`${key}.desc`)}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <a
            href={`/${locale}/inscripcion`}
            className="btn-accent w-full !px-6 !py-3.5 !text-base sm:w-auto sm:!px-8 sm:!py-4 sm:!text-lg"
          >
            {t('cta')}
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
