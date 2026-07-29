'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Radio, Smartphone } from 'lucide-react';

export default function Technologies() {
  const t = useTranslations('technologies');
  const locale = useLocale();

  const items = [
    { icon: MapPin, title: t('gps.title'), desc: t('gps.desc') },
    { icon: Radio, title: t('geofence.title'), desc: t('geofence.desc') },
    { icon: Smartphone, title: t('timeline.title'), desc: t('timeline.desc') },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title mb-12"
        >
          {t('title')}
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand">
                <Icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-text">{title}</h3>
              <p className="text-sm text-text-muted">{desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href={`/${locale}/inscripcion`} className="btn-primary">
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
