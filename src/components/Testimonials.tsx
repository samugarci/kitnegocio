'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

type Testimonial = { quote: string; name: string; role: string };

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as Testimonial[];

  return (
    <section className="page-shell py-20 md:py-28">
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title mb-14"
        >
          {t('title')}
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.blockquote
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl border border-brand/10 bg-white p-7"
            >
              <Quote className="mb-4 h-8 w-8 text-accent/40" />
              <p className="mb-6 leading-relaxed text-ink-soft">&ldquo;{item.quote}&rdquo;</p>
              <footer>
                <p className="font-display font-bold text-ink">{item.name}</p>
                <p className="text-sm text-ink-faint">{item.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
