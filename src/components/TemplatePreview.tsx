'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Images,
  Clapperboard,
  MessageCircle,
  Heart,
  Bookmark,
  MoreHorizontal,
  Play,
  ShoppingBag,
  CheckCheck,
  Search,
  Phone,
  Video,
  CheckCircle2,
  Expand,
} from 'lucide-react';
import { IMAGES } from '@/lib/images';

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
    <section id="preview" className="relative overflow-hidden bg-paper py-20 md:py-28">
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">{t('eyebrow')}</p>
          <h2 className="section-title mt-3">{t('title')}</h2>
          <p className="section-sub mx-auto">{t('subtitle')}</p>
        </motion.div>

        <div className="relative mx-auto mt-10 flex max-w-3xl gap-2 overflow-x-auto rounded-2xl border border-slate-200/80 bg-white/75 p-1.5 shadow-sm backdrop-blur scrollbar-thin">
          {TABS.map((tab, i) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActive(i)}
                className={`group inline-flex min-w-[9.5rem] flex-1 items-center justify-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                  active === i
                    ? 'border-brand bg-gradient-to-r from-brand to-brand-dark text-white shadow-[0_12px_24px_-12px_rgba(14,116,144,0.7)]'
                    : 'border-transparent bg-transparent text-ink-soft hover:bg-brand-light hover:text-brand'
                }`}
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${active === i ? 'bg-white/15' : 'bg-brand/8'}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-center leading-tight">{t(`items.${tab.key}.title`)}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-8 grid items-stretch overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_35px_80px_-35px_rgba(15,23,42,0.35)] lg:grid-cols-[1.15fr_0.85fr]"
          >
            {/* Ejemplo visual (siempre local, no depende de Unsplash) */}
            <div className="relative min-h-[460px] overflow-hidden bg-ink lg:min-h-[590px]">
              <PackExample type={current.key} locale={locale} />
              <div className="absolute left-4 right-4 top-4 z-30 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#071822]/65 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                  {t('exampleLabel')}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#071822]/65 px-3 py-1.5 text-[10px] font-semibold text-white/85 backdrop-blur-md">
                  <Expand className="h-3.5 w-3.5" />
                  {locale === 'en' ? 'Real preview' : 'Vista real'}
                </span>
              </div>
            </div>

            {/* Explicación */}
            <div className="flex flex-col justify-center bg-[linear-gradient(145deg,#ffffff,#f8fafc)] p-6 md:p-9 lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                {locale === 'en' ? `Example ${active + 1} of 3` : `Ejemplo ${active + 1} de 3`}
              </p>
              <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
                {t(`items.${current.key}.title`)}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                {t(`items.${current.key}.desc`)}
              </p>

              <div className="mt-6 rounded-2xl border border-brand/12 bg-brand-light/55 p-4">
                <p className="text-sm font-bold text-brand">{t(`items.${current.key}.exampleTitle`)}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink">
                  {t(`items.${current.key}.exampleBody`)}
                </p>
              </div>

              <div className="mt-3 rounded-2xl border border-accent/15 bg-accent-light/70 p-4">
                <p className="text-sm font-bold text-accent-dark">{t('howLabel')}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink">
                  {t(`items.${current.key}.how`)}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {(locale === 'en'
                  ? ['Editable', 'Ready to publish', 'Professional quality']
                  : ['Editable', 'Listo para publicar', 'Calidad profesional']
                ).map((label) => (
                  <span key={label} className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-ink-soft shadow-sm">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    {label}
                  </span>
                ))}
              </div>

              <Link href={`/${locale}/inscripcion`} className="btn-accent mt-6 inline-flex w-full sm:w-fit">
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
      <div className="relative flex h-full min-h-[460px] items-center justify-center overflow-hidden bg-[#eef2f5] p-5 lg:min-h-[590px]">
        <Image
          src={IMAGES.invoice}
          alt={es ? 'Galería profesional de publicaciones para Instagram' : 'Professional Instagram post gallery'}
          fill
          priority={false}
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 58vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#071822]/25 via-[#071822]/10 to-[#071822]/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(7,24,34,0.28))]" />

        {/* Dos piezas secundarias del mismo pack */}
        <motion.div
          initial={{ opacity: 0, x: -20, rotate: -8 }}
          animate={{ opacity: 1, x: 0, rotate: -6 }}
          transition={{ delay: 0.15 }}
          className="absolute left-3 top-[22%] hidden aspect-square w-[130px] overflow-hidden rounded-2xl border border-white/40 bg-[#fff8f0]/95 shadow-2xl backdrop-blur sm:block lg:left-5 lg:w-[150px]"
        >
          <div className="h-2 bg-accent" />
          <div className="p-4">
            <span className="rounded-full bg-accent/10 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-accent">
              {es ? 'Testimonio' : 'Testimonial'}
            </span>
            <p className="mt-4 text-[10px] font-semibold leading-relaxed text-ink">
              “{es ? 'La atención fue increíble y el resultado superó mis expectativas.' : 'Amazing service—the result exceeded my expectations.'}”
            </p>
            <div className="mt-3 flex gap-0.5 text-[9px] text-amber-500">★★★★★</div>
            <p className="mt-2 text-[8px] font-bold text-ink-faint">— CLIENTE REAL</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20, rotate: 8 }}
          animate={{ opacity: 1, x: 0, rotate: 6 }}
          transition={{ delay: 0.25 }}
          className="absolute bottom-[18%] right-3 hidden aspect-square w-[130px] overflow-hidden rounded-2xl border border-white/20 bg-brand/95 shadow-2xl backdrop-blur sm:block lg:right-5 lg:w-[150px]"
        >
          <div className="flex h-full flex-col justify-between p-4 text-white">
            <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-white/65">
              {es ? 'Tip rápido' : 'Quick tip'}
            </span>
            <div>
              <p className="text-3xl font-black text-accent">03</p>
              <p className="mt-1 text-[11px] font-bold leading-tight">
                {es ? 'Claves para vender más por Instagram' : 'Ways to sell more on Instagram'}
              </p>
            </div>
            <p className="text-[8px] text-white/60">@TU_NEGOCIO</p>
          </div>
        </motion.div>

        {/* Post principal de Instagram */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 14 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 w-full max-w-[300px] overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white shadow-[0_28px_60px_-22px_rgba(15,23,42,0.45)]"
        >
          <div className="flex items-center justify-between px-3 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand to-accent text-[8px] font-black text-white">
                TN
              </div>
              <div>
                <p className="text-[10px] font-bold text-ink">tu_negocio</p>
                <p className="text-[8px] text-ink-faint">{es ? 'Publicidad' : 'Sponsored'}</p>
              </div>
            </div>
            <MoreHorizontal className="h-4 w-4 text-ink" />
          </div>

          <div className="relative aspect-square overflow-hidden bg-[#f6e7d7]">
            <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent/25" />
            <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-brand/20" />
            <div className="absolute left-5 top-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-brand">
                {es ? 'OFERTA DE LA SEMANA' : 'DEAL OF THE WEEK'}
              </p>
              <p className="mt-2 max-w-[155px] font-display text-[25px] font-extrabold leading-[0.95] text-ink">
                {es ? 'Renueva tu estilo' : 'Refresh your style'}
              </p>
              <p className="mt-2 text-[10px] text-ink-soft">
                {es ? 'Solo hasta el domingo' : 'Only through Sunday'}
              </p>
            </div>

            {/* Producto ilustrado localmente */}
            <div className="absolute bottom-5 right-7 flex items-end gap-2">
              <div className="h-28 w-16 rounded-t-[2rem] rounded-b-xl bg-gradient-to-b from-white to-slate-200 shadow-xl">
                <div className="mx-auto mt-8 h-8 w-10 rounded bg-brand/90 p-1 text-center text-[6px] font-bold text-white">
                  TU MARCA
                </div>
              </div>
              <div className="h-20 w-14 rounded-t-xl bg-gradient-to-b from-accent to-accent-dark shadow-xl">
                <div className="mx-auto mt-7 h-5 w-10 rounded bg-white/90 text-center text-[6px] font-bold leading-5 text-accent">
                  NUEVO
                </div>
              </div>
            </div>

            <div className="absolute bottom-5 left-5 rounded-full bg-ink px-3 py-2 text-[9px] font-bold text-white shadow-lg">
              -30% · {es ? 'COMPRAR' : 'SHOP NOW'}
            </div>
          </div>

          <div className="px-3 pb-3 pt-2.5">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <Heart className="h-5 w-5 text-ink" />
                <MessageCircle className="h-5 w-5 text-ink" />
                <ArrowRight className="h-5 w-5 -rotate-45 text-ink" />
              </div>
              <Bookmark className="h-5 w-5 text-ink" />
            </div>
            <p className="mt-2 text-[10px] font-bold text-ink">
              {es ? '1,248 Me gusta' : '1,248 likes'}
            </p>
            <p className="mt-1 text-[9px] leading-relaxed text-ink">
              <strong>tu_negocio</strong>{' '}
              {es
                ? 'Tu favorito ahora con 30% de descuento. Escríbenos “QUIERO” 💬'
                : 'Your favorite is now 30% off. Message “WANT” 💬'}
            </p>
          </div>
        </motion.div>

        <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/95 px-4 py-2 text-center text-[10px] font-semibold text-ink shadow-lg">
          {es ? '3 de los 30 posts editables incluidos' : '3 of 30 editable posts included'}
        </div>
      </div>
    );
  }

  if (type === 'social') {
    return (
      <div className="relative flex h-full min-h-[460px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#20104f] via-[#6d246f] to-[#f05a2a] p-5 lg:min-h-[590px]">
        <Image
          src={IMAGES.calendar}
          alt={es ? 'Producción profesional de Reels y Stories' : 'Professional Reels and Stories production'}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 58vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#071822]/55 via-[#20104f]/30 to-[#071822]/70" />

        {/* Stories secundarias */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute left-4 top-24 hidden h-[250px] w-[140px] rotate-[-7deg] overflow-hidden rounded-2xl border border-white/30 bg-[#f8c7a8]/95 shadow-2xl backdrop-blur sm:block lg:left-8"
        >
          <div className="flex gap-1 p-2">
            {[0, 1, 2].map((i) => <div key={i} className="h-0.5 flex-1 rounded bg-white/80" />)}
          </div>
          <div className="flex h-[220px] flex-col justify-between p-4 text-ink">
            <p className="text-[8px] font-bold uppercase tracking-widest">@TU_NEGOCIO</p>
            <div>
              <p className="text-[10px] font-semibold">{es ? 'ANTES' : 'BEFORE'}</p>
              <p className="mt-1 font-display text-xl font-extrabold">
                {es ? 'Sin estrategia' : 'No strategy'}
              </p>
              <ArrowRight className="mt-4 h-7 w-7 text-accent" />
            </div>
            <p className="text-[8px]">{es ? 'Toca para ver el cambio' : 'Tap to see the change'}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-20 right-4 hidden h-[250px] w-[140px] rotate-[7deg] overflow-hidden rounded-2xl border border-white/25 bg-brand/95 shadow-2xl backdrop-blur sm:block lg:right-8"
        >
          <div className="flex gap-1 p-2">
            {[0, 1, 2].map((i) => <div key={i} className="h-0.5 flex-1 rounded bg-white/80" />)}
          </div>
          <div className="flex h-[220px] flex-col justify-between p-4 text-white">
            <p className="text-[8px] font-bold uppercase tracking-widest">@TU_NEGOCIO</p>
            <div className="text-center">
              <p className="font-display text-3xl font-extrabold">2×1</p>
              <p className="mt-2 text-[11px] font-semibold">{es ? 'SOLO HOY' : 'TODAY ONLY'}</p>
            </div>
            <div className="rounded-full bg-white px-2 py-2 text-center text-[8px] font-bold text-brand">
              {es ? 'DESLIZA PARA COMPRAR' : 'SWIPE TO SHOP'}
            </div>
          </div>
        </motion.div>

        {/* Reel principal */}
        <motion.div
          initial={{ y: 18, opacity: 0, scale: 0.94 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 h-[390px] w-[220px] overflow-hidden rounded-[2rem] border-[5px] border-[#111827] bg-gradient-to-b from-[#f8c7a8] via-accent to-[#20104f] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.75)]"
        >
          <div className="absolute left-1/2 top-2 z-20 h-1.5 w-14 -translate-x-1/2 rounded-full bg-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.3),transparent_26%)]" />
          <div className="absolute left-1/2 top-20 h-28 w-28 -translate-x-1/2 rounded-full border-[12px] border-white/20" />
          <div className="absolute left-1/2 top-[6.2rem] h-16 w-16 -translate-x-1/2 rounded-full bg-white/85 shadow-lg" />

          <div className="absolute left-3 right-3 top-5 flex items-center justify-between text-[9px] font-semibold text-white">
            <span>Reels</span>
            <span>•••</span>
          </div>

          <div className="absolute inset-x-3 top-[185px] rounded-2xl bg-black/25 p-3 text-center backdrop-blur-sm">
            <span className="rounded-full bg-accent px-2 py-1 text-[8px] font-bold text-white">
              HOOK · 0–2 SEG
            </span>
            <p className="mt-2 font-display text-xl font-extrabold leading-tight text-white">
              {es ? '3 errores que frenan tus ventas' : '3 mistakes hurting your sales'}
            </p>
          </div>

          <div className="absolute bottom-3 left-3 right-12">
            <p className="text-[9px] font-bold text-white">@tu_negocio</p>
            <p className="mt-1 text-[9px] leading-relaxed text-white/85">
              {es ? 'Guión, textos y CTA incluidos ✨' : 'Script, overlays and CTA included ✨'}
            </p>
          </div>
          <div className="absolute bottom-5 right-3 space-y-3 text-white">
            <Heart className="h-5 w-5 fill-white" />
            <MessageCircle className="h-5 w-5 fill-white" />
            <Bookmark className="h-5 w-5 fill-white" />
          </div>
          <div className="absolute left-1/2 top-[150px] flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-white/25 backdrop-blur">
            <Play className="ml-1 h-6 w-6 fill-white text-white" />
          </div>
        </motion.div>

        <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/95 px-4 py-2 text-center text-[10px] font-semibold text-ink shadow-lg">
          {es ? 'Reel + 2 Stories editables del pack' : 'Editable Reel + 2 Stories from the pack'}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-[460px] items-center justify-center overflow-hidden bg-[#d9dbd5] p-4 lg:min-h-[590px]">
      <Image
        src={IMAGES.proposal}
        alt={es ? 'Atención profesional de ventas por WhatsApp Business' : 'Professional WhatsApp Business sales support'}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 58vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#004d40]/35 via-[#071822]/15 to-[#071822]/55" />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle, #111 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.96 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 h-[430px] w-full max-w-[330px] overflow-hidden rounded-[1.75rem] border-[5px] border-[#111827] bg-[#efeae2] shadow-[0_30px_70px_-22px_rgba(0,0,0,0.7)]"
      >
        {/* Cabecera WhatsApp */}
        <div className="flex h-14 items-center gap-2 bg-[#008069] px-3 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
            <ShoppingBag className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-bold">{es ? 'Tu Negocio' : 'Your Business'}</p>
            <p className="text-[8px] text-white/75">{es ? 'Cuenta de empresa' : 'Business account'}</p>
          </div>
          <Video className="h-4 w-4" />
          <Phone className="h-4 w-4" />
          <MoreHorizontal className="h-4 w-4" />
        </div>

        <div className="h-[330px] space-y-2 overflow-hidden px-3 py-3">
          <div className="mx-auto w-fit rounded-md bg-[#fff5c4] px-2 py-1 text-[7px] font-medium text-ink-soft shadow-sm">
            {es ? 'HOY' : 'TODAY'}
          </div>
          <Bubble side="left" time="10:14">
            {es ? '¡Hola! Vi la oferta en Instagram. ¿Qué opciones tienen?' : 'Hi! I saw your Instagram offer. What options do you have?'}
          </Bubble>
          <Bubble side="right" time="10:15" read>
            {es
              ? '¡Hola, Laura! 👋 Claro, te comparto nuestro catálogo:'
              : 'Hi Laura! 👋 Of course—here is our catalog:'}
          </Bubble>

          {/* Tarjeta visual de catálogo */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="ml-auto max-w-[88%] overflow-hidden rounded-xl rounded-br-sm bg-[#d9fdd3] p-1 shadow-sm"
          >
            <div className="grid grid-cols-3 gap-1">
              {[
                [es ? 'Básico' : 'Basic', '$40'],
                ['Pro', '$70'],
                ['Premium', '$120'],
              ].map(([name, price], i) => (
                <div key={name} className="rounded-lg bg-white p-2 text-center">
                  <div className={`mx-auto mb-1 h-7 w-7 rounded-full ${i === 1 ? 'bg-accent/20' : 'bg-brand/15'}`} />
                  <p className="text-[7px] font-bold text-ink">{name}</p>
                  <p className="text-[9px] font-extrabold text-brand">{price}</p>
                </div>
              ))}
            </div>
            <p className="px-2 py-1.5 text-[8px] text-ink">
              {es ? '¿Cuál opción se ajusta mejor a ti?' : 'Which option works best for you?'}
              <span className="float-right ml-2 text-[7px] text-ink-faint">10:15 ✓✓</span>
            </p>
          </motion.div>
          <Bubble side="left" time="10:16">
            {es ? 'Me interesa el plan Pro 🙌' : 'I’m interested in the Pro plan 🙌'}
          </Bubble>
          <Bubble side="right" time="10:16" read>
            {es
              ? '¡Excelente elección! Te envío el enlace para reservar ahora ✅'
              : 'Great choice! I’ll send the booking link now ✅'}
          </Bubble>
        </div>

        {/* Respuestas rápidas */}
        <div className="absolute inset-x-0 bottom-0 border-t border-black/5 bg-[#f0f2f5] p-2">
          <div className="mb-1 flex gap-1 overflow-hidden">
            {(es ? ['/precios', '/seguimiento', '/reservar'] : ['/prices', '/follow-up', '/book']).map((reply) => (
              <span key={reply} className="whitespace-nowrap rounded-full border border-[#00a884]/30 bg-white px-2 py-1 text-[7px] font-semibold text-[#008069]">
                {reply}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-full bg-white px-3 py-2 text-[8px] text-ink-faint">
              {es ? 'Escribe un mensaje' : 'Type a message'}
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00a884] text-white">
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/95 px-4 py-2 text-center text-[10px] font-semibold text-ink shadow-lg">
        {es ? 'Bienvenida + catálogo + cierre incluidos' : 'Welcome + catalog + closing included'}
      </div>
    </div>
  );
}

function Bubble({
  children,
  side,
  time,
  read = false,
}: {
  children: React.ReactNode;
  side: 'left' | 'right';
  time?: string;
  read?: boolean;
}) {
  return (
    <div
      className={`max-w-[88%] whitespace-pre-line rounded-xl px-2.5 py-2 text-[9px] leading-snug text-ink shadow-sm ${
        side === 'right' ? 'ml-auto rounded-br-sm bg-[#d9fdd3]' : 'rounded-bl-sm bg-white'
      }`}
    >
      {children}
      {time && (
        <span className="ml-2 inline-flex translate-y-0.5 items-center gap-0.5 text-[6px] text-ink-faint">
          {time}
          {read && <CheckCheck className="h-2.5 w-2.5 text-[#53bdeb]" />}
        </span>
      )}
    </div>
  );
}
