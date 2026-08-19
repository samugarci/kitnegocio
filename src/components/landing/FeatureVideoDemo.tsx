'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play, VolumeX } from 'lucide-react';
import type { FeatureKey } from '@/lib/featureMedia';

/**
 * Demo tipo “video” 100% local (CSS/animaciones).
 * No depende de Pexels, Google CDN ni Unsplash — siempre se ve.
 */
export default function FeatureVideoDemo({
  featureKey,
  locale,
  label,
}: {
  featureKey: FeatureKey;
  locale: string;
  label: string;
}) {
  const es = locale !== 'en';
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [slide, setSlide] = useState(0);

  const frames = FRAMES[featureKey];
  const frame = frames[slide % frames.length];

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setSlide((s) => s + 1);
          return 0;
        }
        return p + 2;
      });
    }, 80);
    return () => window.clearInterval(id);
  }, [playing, slide]);

  useEffect(() => {
    setProgress(0);
    setSlide(0);
    setPlaying(true);
  }, [featureKey]);

  return (
    <div className="relative flex h-full min-h-[260px] flex-col bg-ink md:min-h-[300px]">
      <span className="absolute left-3 top-3 z-20 rounded-lg bg-accent px-2.5 py-1 text-xs font-bold text-white">
        {label}
      </span>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4 pt-12">
        <div className={`absolute inset-0 bg-gradient-to-br ${frame.bg}`} />
        <AnimatePresence mode="wait">
          <motion.div
            key={`${featureKey}-${slide}`}
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -8 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 w-full max-w-[280px]"
          >
            <VideoScene featureKey={featureKey} frame={frame} es={es} />
          </motion.div>
        </AnimatePresence>

        {/* Rec indicator */}
        <div className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-black/50 px-2 py-1 text-[10px] font-bold text-white">
          <span className={`h-2 w-2 rounded-full bg-red-500 ${playing ? 'animate-pulse' : ''}`} />
          REC
        </div>
      </div>

      {/* Controles tipo video */}
      <div className="relative z-20 border-t border-white/10 bg-black/50 px-3 py-2 backdrop-blur">
        <div className="mb-2 h-1 overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center gap-3 text-white">
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            className="rounded-md p-1 hover:bg-white/10"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <Pause className="h-4 w-4 fill-white" /> : <Play className="h-4 w-4 fill-white" />}
          </button>
          <span className="text-[10px] text-white/70">
            0:{String(Math.floor((progress / 100) * 12)).padStart(2, '0')} / 0:12
          </span>
          <VolumeX className="ml-auto h-3.5 w-3.5 text-white/50" />
        </div>
      </div>
    </div>
  );
}

type Frame = { bg: string; titleEs: string; titleEn: string; subEs: string; subEn: string };

const FRAMES: Record<FeatureKey, Frame[]> = {
  invoice: [
    {
      bg: 'from-brand via-brand-dark to-ink',
      titleEs: 'Oferta -30%',
      titleEn: 'Sale -30%',
      subEs: 'Post listo para el feed',
      subEn: 'Feed post ready',
    },
    {
      bg: 'from-accent via-brand to-ink',
      titleEs: 'Testimonio ⭐⭐⭐⭐⭐',
      titleEn: 'Testimonial ⭐⭐⭐⭐⭐',
      subEs: 'Plantilla Canva editable',
      subEn: 'Editable Canva template',
    },
  ],
  quote: [
    {
      bg: 'from-accent via-orange-600 to-ink',
      titleEs: 'Hook: 3 errores…',
      titleEn: 'Hook: 3 mistakes…',
      subEs: 'Guión de Reel 20s',
      subEn: '20s Reel script',
    },
    {
      bg: 'from-brand via-cyan-700 to-ink',
      titleEs: 'CTA: Comenta QUIERO',
      titleEn: 'CTA: Comment WANT',
      subEs: 'Cierre que vende',
      subEn: 'Closing that sells',
    },
  ],
  calendar: [
    {
      bg: 'from-violet-600 via-brand to-ink',
      titleEs: 'Story 1 · Antes',
      titleEn: 'Story 1 · Before',
      subEs: 'Secuencia del mes',
      subEn: 'Month sequence',
    },
    {
      bg: 'from-brand via-accent to-ink',
      titleEs: 'Story 2 · Después',
      titleEn: 'Story 2 · After',
      subEs: 'Plantilla 9:16',
      subEn: '9:16 template',
    },
  ],
  proposal: [
    {
      bg: 'from-[#0B141A] via-[#128C7E] to-[#075E54]',
      titleEs: 'Hola, ¿precios?',
      titleEn: 'Hi, prices?',
      subEs: 'Mensaje del cliente',
      subEn: 'Customer message',
    },
    {
      bg: 'from-[#075E54] via-[#128C7E] to-[#0B141A]',
      titleEs: '3 opciones listas',
      titleEn: '3 options ready',
      subEs: 'Plantilla de respuesta',
      subEn: 'Reply template',
    },
  ],
  checklist: [
    {
      bg: 'from-slate-700 via-brand to-ink',
      titleEs: 'Lun · Tip',
      titleEn: 'Mon · Tip',
      subEs: 'Calendario semanal',
      subEn: 'Weekly calendar',
    },
    {
      bg: 'from-brand via-slate-800 to-ink',
      titleEs: 'Vie · Promo',
      titleEn: 'Fri · Promo',
      subEs: 'Qué publicar cada día',
      subEn: 'What to post each day',
    },
  ],
  guide: [
    {
      bg: 'from-accent-light via-brand-light to-paper',
      titleEs: 'Caption listo ✨',
      titleEn: 'Caption ready ✨',
      subEs: 'Copia y pega',
      subEn: 'Copy and paste',
    },
    {
      bg: 'from-brand-light via-accent-light to-white',
      titleEs: '#emprende #ventas',
      titleEn: '#business #sales',
      subEs: 'Hashtags del pack',
      subEn: 'Pack hashtags',
    },
  ],
  library: [
    {
      bg: 'from-ink via-brand-dark to-brand',
      titleEs: 'Pack marzo',
      titleEn: 'March pack',
      subEs: 'Descarga ZIP',
      subEn: 'ZIP download',
    },
    {
      bg: 'from-brand-dark via-ink to-accent-dark',
      titleEs: 'Pack febrero',
      titleEn: 'February pack',
      subEs: 'Biblioteca activa',
      subEn: 'Active library',
    },
  ],
  support: [
    {
      bg: 'from-slate-600 via-brand to-ink',
      titleEs: 'Ticket enviado',
      titleEn: 'Ticket sent',
      subEs: 'Soporte 24–48 h',
      subEn: 'Support 24–48h',
    },
    {
      bg: 'from-brand via-slate-700 to-ink',
      titleEs: 'Respuesta lista',
      titleEn: 'Reply ready',
      subEs: 'Ayuda con Canva',
      subEn: 'Canva help',
    },
  ],
};

function VideoScene({
  featureKey,
  frame,
  es,
}: {
  featureKey: FeatureKey;
  frame: Frame;
  es: boolean;
}) {
  const title = es ? frame.titleEs : frame.titleEn;
  const sub = es ? frame.subEs : frame.subEn;

  if (featureKey === 'proposal') {
    return (
      <div className="space-y-2 rounded-2xl bg-[#0B141A]/80 p-3">
        <div className="rounded-2xl rounded-bl-sm bg-[#202C33] px-3 py-2 text-[11px] text-white">
          {es ? 'Hola, ¿cuánto cuesta?' : 'Hi, how much is it?'}
        </div>
        <div className="ml-6 rounded-2xl rounded-br-sm bg-[#005C4B] px-3 py-2 text-[11px] text-white">
          {title}
          <br />
          <span className="opacity-80">{sub}</span>
        </div>
      </div>
    );
  }

  if (featureKey === 'quote' || featureKey === 'calendar') {
    return (
      <div className="mx-auto w-[150px] overflow-hidden rounded-[1.25rem] border-2 border-white/30 bg-black/30 shadow-lg">
        <div className="flex aspect-[9/16] flex-col justify-end p-3">
          <p className="text-sm font-bold text-white">{title}</p>
          <p className="mt-1 text-[10px] text-white/80">{sub}</p>
        </div>
      </div>
    );
  }

  if (featureKey === 'invoice') {
    return (
      <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="bg-gradient-to-br from-brand to-accent px-4 py-6 text-center text-white">
          <p className="font-display text-xl font-bold">{title}</p>
          <p className="mt-1 text-xs opacity-90">{sub}</p>
        </div>
        <div className="p-3">
          <div className="rounded-lg bg-brand px-2 py-2 text-center text-[10px] font-bold text-white">
            {es ? 'Escríbenos' : 'Message us'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-center backdrop-blur">
      <p className="font-display text-xl font-bold text-white">{title}</p>
      <p className="mt-2 text-sm text-white/80">{sub}</p>
      <motion.div
        className="mx-auto mt-4 h-1.5 w-24 overflow-hidden rounded-full bg-white/20"
        initial={false}
      >
        <motion.div
          className="h-full bg-accent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          style={{ width: '40%' }}
        />
      </motion.div>
    </div>
  );
}
