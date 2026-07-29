'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Images, Clapperboard, MessageCircle } from 'lucide-react';

type PreviewKey = 'invoice' | 'social' | 'proposal';

const TABS: { key: PreviewKey; icon: typeof Images }[] = [
  { key: 'invoice', icon: Images },
  { key: 'social', icon: Clapperboard },
  { key: 'proposal', icon: MessageCircle },
];

export default function TemplatePreview() {
  const t = useTranslations('preview');
  const locale = useLocale();
  const [active, setActive] = useState(0);
  const current = TABS[active];

  return (
    <section id="preview" className="bg-paper-warm py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-sub">{t('subtitle')}</p>
        </motion.div>

        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-2">
          {TABS.map((tab, i) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActive(i)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                  active === i
                    ? 'bg-brand text-white shadow-[0_10px_24px_-10px_rgba(14,116,144,0.6)]'
                    : 'bg-white text-ink-soft hover:bg-brand-light hover:text-brand'
                }`}
              >
                <Icon className="h-4 w-4" />
                {t(`items.${tab.key}.title`)}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-8 grid items-stretch gap-6 overflow-hidden rounded-3xl border border-brand/10 bg-white shadow-[0_30px_60px_-28px_rgba(14,116,144,0.28)] lg:grid-cols-2"
          >
            {/* Ejemplo visual (siempre local, no depende de Unsplash) */}
            <div className="relative min-h-[320px] bg-ink lg:min-h-[380px]">
              <PackExample type={current.key} locale={locale} />
              <span className="absolute left-4 top-4 rounded-lg bg-accent px-3 py-1 text-xs font-bold text-white">
                {t('exampleLabel')}
              </span>
            </div>

            {/* Explicación */}
            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                {locale === 'en' ? `Example ${active + 1} of 3` : `Ejemplo ${active + 1} de 3`}
              </p>
              <h3 className="mt-2 font-display text-3xl font-bold text-ink">
                {t(`items.${current.key}.title`)}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                {t(`items.${current.key}.desc`)}
              </p>

              <div className="mt-6 rounded-2xl border border-brand/15 bg-brand-light/60 p-4">
                <p className="text-sm font-bold text-brand">{t(`items.${current.key}.exampleTitle`)}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink">
                  {t(`items.${current.key}.exampleBody`)}
                </p>
              </div>

              <div className="mt-4 rounded-2xl border border-accent/20 bg-accent-light p-4">
                <p className="text-sm font-bold text-accent-dark">{t('howLabel')}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink">
                  {t(`items.${current.key}.how`)}
                </p>
              </div>

              <Link href={`/${locale}/inscripcion`} className="btn-accent mt-8 inline-flex w-fit">
                {t('cta')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function PackExample({ type, locale }: { type: PreviewKey; locale: string }) {
  const es = locale !== 'en';

  if (type === 'invoice') {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-[260px] overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="bg-gradient-to-br from-brand to-accent px-4 py-8 text-center text-white">
            <p className="text-xs font-semibold opacity-80">{es ? 'TU MARCA' : 'YOUR BRAND'}</p>
            <p className="mt-2 font-display text-2xl font-bold">
              {es ? 'Oferta de la semana' : 'Deal of the week'}
            </p>
            <p className="mt-3 text-4xl font-extrabold">-30%</p>
          </div>
          <div className="space-y-2 p-4">
            <div className="h-2 rounded bg-paper" />
            <div className="h-2 w-2/3 rounded bg-paper" />
            <div className="mt-3 rounded-xl bg-brand px-3 py-2 text-center text-xs font-bold text-white">
              {es ? 'Escríbenos por WhatsApp' : 'Message us on WhatsApp'}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (type === 'social') {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative h-[300px] w-[170px] overflow-hidden rounded-[1.5rem] border-2 border-white/25 bg-gradient-to-b from-accent via-brand to-ink shadow-xl"
        >
          <div className="absolute left-1/2 top-2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/30" />
          <div className="absolute inset-x-0 bottom-0 space-y-2 bg-gradient-to-t from-ink/90 to-transparent p-4 pt-16">
            <p className="text-sm font-bold text-white">
              {es ? '3 tips para vender más 👇' : '3 tips to sell more 👇'}
            </p>
            <p className="text-[10px] text-white/80">
              {es ? '1) Responde rápido  2) Muestra precios  3) CTA claro' : '1) Reply fast  2) Show prices  3) Clear CTA'}
            </p>
            <div className="rounded-lg bg-white/15 px-2 py-1.5 text-[9px] font-semibold text-white">
              {es ? 'Guión 20s + textos en pantalla' : '20s script + on-screen text'}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center bg-[#0B141A] p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[280px] space-y-2"
      >
        <p className="text-center text-[10px] font-semibold text-[#25D366]">WhatsApp Business</p>
        <Bubble side="left">
          {es ? 'Hola, ¿cuánto cuesta el servicio?' : 'Hi, how much is the service?'}
        </Bubble>
        <Bubble side="right">
          {es
            ? '¡Hola! Te dejo 3 opciones:\n1) Básico $40\n2) Pro $70\n3) Premium $120\n¿Cuál te sirve?'
            : 'Hi! Here are 3 options:\n1) Basic $40\n2) Pro $70\n3) Premium $120\nWhich works for you?'}
        </Bubble>
        <p className="pt-1 text-center text-[9px] text-white/50">
          {es ? 'Plantilla de precios lista para pegar' : 'Price template ready to paste'}
        </p>
      </motion.div>
    </div>
  );
}

function Bubble({ children, side }: { children: React.ReactNode; side: 'left' | 'right' }) {
  return (
    <div
      className={`max-w-[92%] whitespace-pre-line rounded-2xl px-3 py-2 text-[11px] leading-snug text-white ${
        side === 'right' ? 'ml-auto rounded-br-sm bg-[#005C4B]' : 'rounded-bl-sm bg-[#202C33]'
      }`}
    >
      {children}
    </div>
  );
}
