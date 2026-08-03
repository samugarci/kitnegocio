'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Check, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import Link from 'next/link';

export default function Pricing() {
  const t = useTranslations('pricing');
  const locale = useLocale();
  const benefits = t.raw('plans.full.benefits') as string[];

  return (
    <section id="pricing" className="bg-paper py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="section-title !text-[1.75rem] sm:!text-3xl md:!text-4xl lg:!text-5xl">
            {t('title')}
          </h2>
          <p className="section-sub !mt-3 !text-[15px] sm:!text-lg">{t('subtitle')}</p>
        </div>

        <div className="grid overflow-hidden rounded-[1.5rem] border border-accent/25 bg-white shadow-[0_30px_60px_-35px_rgba(240,89,42,0.45)] sm:rounded-[1.75rem] lg:grid-cols-2">
          <div className="relative min-h-[180px] sm:min-h-[220px] lg:min-h-full">
            <Image
              src={IMAGES.kitClarity}
              alt=""
              fill
              quality={65}
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent lg:bg-gradient-to-r" />
            <div className="absolute bottom-4 left-4 right-4 text-white sm:bottom-5 sm:left-5 sm:right-5">
              <p className="font-display text-lg font-bold sm:text-xl">{t('visualTitle')}</p>
              <p className="mt-1 text-xs text-white/75 sm:text-sm">{t('visualSub')}</p>
            </div>
          </div>

          <article className="flex flex-col p-5 sm:p-6 md:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent sm:text-xs">
              {t('plans.full.name')}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t('plans.full.desc')}</p>
            <p className="mt-5 font-display text-4xl font-bold text-ink sm:text-5xl">
              {t('plans.full.price')}
              <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-ink-faint sm:text-sm">
                {t('currency')} · {t('period')}
              </span>
            </p>
            <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-accent-light px-3 py-1.5 text-xs font-semibold text-accent-dark sm:text-sm">
              <ShieldCheck className="h-4 w-4" />
              {t('plans.full.badge')}
            </div>

            <ul className="mt-6 space-y-3">
              {benefits.slice(0, 5).map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-ink-soft">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <a
              href={`/${locale}/inscripcion`}
              className="btn-accent mt-7 w-full !px-6 !py-3.5 !text-base text-center sm:mt-8 sm:!px-8 sm:!py-4 sm:!text-lg"
            >
              {t('plans.full.cta')}
              <ArrowRight className="h-5 w-5" />
            </a>
            <p className="mt-3 text-center text-xs text-ink-faint">{t('secureNote')}</p>
            <p className="mt-2 flex flex-wrap items-center justify-center gap-1.5 text-center text-xs text-ink-soft">
              <FileText className="h-3.5 w-3.5 text-brand" />
              <Link href={`/${locale}/terminos`} className="font-semibold text-brand hover:underline">
                {t('termsLink')}
              </Link>
              <span>· {t('noRefundsShort')}</span>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
