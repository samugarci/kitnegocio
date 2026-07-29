'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Loader2, Settings, ArrowRight } from 'lucide-react';
import FlowSteps from './FlowSteps';
import { IMAGES } from '@/lib/images';

export default function ResultClient() {
  const t = useTranslations('result');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<{
    verified: boolean;
    sessionId: string;
    email?: string;
    subscription?: boolean;
  } | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    const emailParam = searchParams.get('email');
    const url = emailParam
      ? `/api/verify-session?session_id=${sessionId}&email=${encodeURIComponent(emailParam)}`
      : `/api/verify-session?session_id=${sessionId}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSessionData(data);
        if (data.email) {
          localStorage.setItem('kitnegocio_email', data.email);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sessionId, searchParams]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-brand" />
      </div>
    );
  }

  const membersHref = `/${locale}/miembros${
    sessionData?.email ? `?email=${encodeURIComponent(sessionData.email)}` : ''
  }`;

  return (
    <section className="page-shell py-12 md:py-20">
      <div className="relative mx-auto max-w-3xl px-4 md:px-6">
        <FlowSteps current="resultado" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-3xl border border-brand/10 bg-white shadow-[0_30px_60px_-28px_rgba(13,92,99,0.35)]"
        >
          <div className="relative h-40">
            <Image src={IMAGES.workspace} alt="" fill className="object-cover" sizes="800px" />
            <div className="absolute inset-0 bg-brand/70" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <CheckCircle className="mb-3 h-14 w-14 text-accent" />
              <h1 className="font-display text-2xl font-bold md:text-3xl">{t('title')}</h1>
            </div>
          </div>

          <div className="px-8 py-8 text-center">
            <p className="text-ink-soft">{t('subtitle')}</p>
            {sessionData?.sessionId && (
              <p className="mt-3 text-sm text-ink-faint">
                {t('reference')}:{' '}
                <code className="rounded-lg bg-paper px-2 py-1 font-mono text-xs">{sessionData.sessionId}</code>
              </p>
            )}

            <p className="mt-6 rounded-xl bg-accent-light p-4 text-sm text-accent-dark">{t('trialNote')}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href={membersHref} className="btn-accent inline-flex">
                <Download className="h-5 w-5" />
                {t('accessMembers')}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href={membersHref} className="btn-secondary inline-flex">
                <Settings className="h-5 w-5" />
                {t('manage')}
              </Link>
            </div>

            <Link href={`/${locale}`} className="mt-6 inline-block text-sm font-medium text-brand hover:underline">
              ← Volver al inicio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
