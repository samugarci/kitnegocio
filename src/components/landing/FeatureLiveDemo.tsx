'use client';

import { motion } from 'framer-motion';
import type { FeatureKey } from '@/lib/featureMedia';

/** Mockups visuales locales — no dependen de internet externo para imágenes */
export default function FeatureLiveDemo({
  featureKey,
  locale,
}: {
  featureKey: FeatureKey;
  locale: string;
}) {
  const es = locale !== 'en';

  switch (featureKey) {
    case 'invoice':
      return (
        <PhoneShell>
          <div className="space-y-2 p-3">
            <p className="text-center text-[10px] font-semibold text-white/70">Instagram</p>
            <div className="grid grid-cols-3 gap-1">
              {['OFERTA', '2x1', 'NUEVO', '-30%', 'PACK', 'HOY'].map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`aspect-square rounded-md p-1 text-[8px] font-bold text-white ${
                    i % 2 === 0 ? 'bg-brand' : 'bg-accent'
                  }`}
                >
                  {label}
                </motion.div>
              ))}
            </div>
            <p className="text-center text-[9px] text-white/80">
              {es ? '30 posts · edita en Canva' : '30 posts · edit in Canva'}
            </p>
          </div>
        </PhoneShell>
      );

    case 'quote':
      return (
        <PhoneShell>
          <div className="flex h-full flex-col justify-end bg-gradient-to-t from-ink via-brand/40 to-accent/30 p-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-bold text-white"
            >
              {es ? '3 errores al cotizar 👇' : '3 quoting mistakes 👇'}
            </motion.p>
            <p className="mt-2 text-[10px] text-white/80">
              {es ? 'Hook → tips → CTA WhatsApp' : 'Hook → tips → WhatsApp CTA'}
            </p>
            <div className="mt-3 rounded-lg bg-white/15 px-2 py-1.5 text-[9px] text-white">
              {es ? 'Guión 15–30s listo' : '15–30s script ready'}
            </div>
          </div>
        </PhoneShell>
      );

    case 'calendar':
      return (
        <PhoneShell tall>
          <div className="space-y-2 p-3">
            {[
              es ? 'Antes / Después' : 'Before / After',
              es ? 'Precio flash' : 'Flash price',
              es ? 'FAQ rápida' : 'Quick FAQ',
              es ? 'CTA: escríbeme' : 'CTA: message me',
            ].map((s, i) => (
              <motion.div
                key={s}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl bg-white/10 px-3 py-3 text-[10px] font-semibold text-white backdrop-blur"
              >
                Story {i + 1}: {s}
              </motion.div>
            ))}
          </div>
        </PhoneShell>
      );

    case 'proposal':
      return (
        <div className="flex h-full items-center justify-center bg-[#0B141A] p-4">
          <div className="w-full max-w-[220px] space-y-2">
            <p className="text-center text-[10px] font-semibold text-[#25D366]">
              WhatsApp Business
            </p>
            <ChatBubble side="left">
              {es
                ? '¡Hola! ¿Tienen disponible para mañana?'
                : 'Hi! Do you have availability tomorrow?'}
            </ChatBubble>
            <ChatBubble side="right">
              {es
                ? '¡Claro! Te dejo 3 opciones y precios 👇'
                : 'Sure! Here are 3 options and prices 👇'}
            </ChatBubble>
            <ChatBubble side="right">
              {es
                ? '1) Básico $40 · 2) Pro $70 · 3) Premium $120'
                : '1) Basic $40 · 2) Pro $70 · 3) Premium $120'}
            </ChatBubble>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="rounded-lg bg-[#005C4B] px-3 py-2 text-[9px] text-white"
            >
              {es ? 'Plantilla de cierre lista para pegar' : 'Closing template ready to paste'}
            </motion.div>
          </div>
        </div>
      );

    case 'checklist':
      return (
        <div className="flex h-full flex-col bg-white p-4">
          <p className="font-display text-sm font-bold text-ink">
            {es ? 'Calendario · Semana 1' : 'Calendar · Week 1'}
          </p>
          <div className="mt-3 space-y-2">
            {(es
              ? [
                  ['Lun', 'Tip de valor'],
                  ['Mié', 'Promo feed'],
                  ['Vie', 'Testimonio'],
                  ['Dom', 'Reel + CTA'],
                ]
              : [
                  ['Mon', 'Value tip'],
                  ['Wed', 'Feed promo'],
                  ['Fri', 'Testimonial'],
                  ['Sun', 'Reel + CTA'],
                ]
            ).map(([day, task], i) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3 rounded-xl border border-brand/10 bg-paper px-3 py-2"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-[10px] font-bold text-white">
                  {day}
                </span>
                <span className="text-xs font-medium text-ink">{task}</span>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'guide':
      return (
        <div className="flex h-full flex-col bg-gradient-to-br from-brand-light to-accent-light p-4">
          <p className="font-display text-sm font-bold text-ink">
            {es ? 'Caption listo' : 'Ready caption'}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 rounded-2xl bg-white p-3 text-[11px] leading-relaxed text-ink-soft shadow-sm"
          >
            {es
              ? '✨ Nuevo drop esta semana. Comenta “QUIERO” y te paso el catálogo por WhatsApp.'
              : '✨ New drop this week. Comment “WANT” and I’ll send the catalog on WhatsApp.'}
          </motion.div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {['#emprende', '#ventas', '#local', '#promo'].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand/10 px-2 py-1 text-[9px] font-semibold text-brand"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      );

    case 'library':
      return (
        <div className="flex h-full flex-col bg-ink p-4 text-white">
          <p className="text-sm font-bold">{es ? 'Tu biblioteca' : 'Your library'}</p>
          <div className="mt-3 space-y-2">
            {(es
              ? ['Marzo 2026', 'Febrero 2026', 'Enero 2026']
              : ['March 2026', 'February 2026', 'January 2026']
            ).map((pack, i) => (
              <motion.div
                key={pack}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between rounded-xl bg-white/10 px-3 py-2.5 text-xs"
              >
                <span>{pack}</span>
                <span className="rounded-md bg-accent px-2 py-0.5 text-[9px] font-bold">
                  ZIP
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'support':
      return (
        <div className="flex h-full flex-col justify-center bg-paper p-5">
          <div className="rounded-2xl border border-brand/15 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-brand">soporte@kitnegocio.com</p>
            <p className="mt-2 text-[11px] text-ink-soft">
              {es
                ? '“No encuentro el link de Canva” → te guiamos en 24–48 h.'
                : '“I can’t find the Canva link” → we guide you in 24–48h.'}
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-brand-light">
              <motion.div
                className="h-full rounded-full bg-brand"
                initial={{ width: '0%' }}
                animate={{ width: '78%' }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </div>
            <p className="mt-1 text-[9px] text-ink-faint">
              {es ? 'Ticket en progreso' : 'Ticket in progress'}
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
}

function PhoneShell({
  children,
  tall,
}: {
  children: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-ink to-brand-dark p-4">
      <div
        className={`w-[160px] overflow-hidden rounded-[1.4rem] border-2 border-white/20 bg-ink shadow-xl ${
          tall ? 'h-[280px]' : 'h-[260px]'
        }`}
      >
        <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-white/20" />
        <div className="h-[calc(100%-0.75rem)] overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function ChatBubble({
  children,
  side,
}: {
  children: React.ReactNode;
  side: 'left' | 'right';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`max-w-[90%] rounded-2xl px-3 py-2 text-[10px] leading-snug text-white ${
        side === 'right' ? 'ml-auto rounded-br-sm bg-[#005C4B]' : 'rounded-bl-sm bg-[#202C33]'
      }`}
    >
      {children}
    </motion.div>
  );
}
