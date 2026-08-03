'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { IMAGES } from '@/lib/images';

type Testimonial = { quote: string; name: string; role: string };

const avatars = [IMAGES.boutiqueOwner, IMAGES.cafeOwner, IMAGES.beautyPro];

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as Testimonial[];

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={IMAGES.creatorPhone}
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/92 to-ink" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t('eyebrow')}</p>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">{t('title')}</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.blockquote
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.06] backdrop-blur-sm"
            >
              <div className="relative h-44">
                <Image
                  src={avatars[i] ?? IMAGES.boutiqueOwner}
                  alt={item.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <Quote className="mb-3 h-7 w-7 text-accent/70" />
                <p className="flex-1 leading-relaxed text-white/80">&ldquo;{item.quote}&rdquo;</p>
                <footer className="mt-6 border-t border-white/10 pt-4">
                  <p className="font-display font-bold text-white">{item.name}</p>
                  <p className="text-sm text-white/50">{item.role}</p>
                </footer>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
