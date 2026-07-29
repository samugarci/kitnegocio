'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Download,
  FileSpreadsheet,
  FileText,
  Palette,
  Loader2,
  Settings,
  LogOut,
  Archive,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { CURRENT_PACK, ARCHIVE_PACKS } from '@/lib/packs';
import FlowSteps from './FlowSteps';
import { IMAGES } from '@/lib/images';

const formatIcons: Record<string, typeof FileText> = {
  XLSX: FileSpreadsheet,
  PDF: FileText,
  CANVA: Palette,
};

export default function MembersClient() {
  const t = useTranslations('members');
  const tErrors = useTranslations('errors');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState('');

  const verifyEmail = async (emailToVerify: string) => {
    setVerifying(true);
    setError('');

    try {
      const res = await fetch('/api/verify-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToVerify }),
      });

      const data = await res.json();

      if (data.hasAccess) {
        setEmail(emailToVerify);
        setHasAccess(true);
        localStorage.setItem('kitnegocio_email', emailToVerify);
      } else {
        setHasAccess(false);
        setError(t('noAccess'));
      }
    } catch {
      setError(tErrors('accessFailed'));
    } finally {
      setVerifying(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlEmail = searchParams.get('email');
    const stored = localStorage.getItem('kitnegocio_email');
    const emailToCheck = urlEmail || stored;

    if (emailToCheck) {
      setInputEmail(emailToCheck);
      verifyEmail(emailToCheck);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmail) return;
    verifyEmail(inputEmail);
  };

  const handleLogout = () => {
    localStorage.removeItem('kitnegocio_email');
    setHasAccess(false);
    setEmail('');
    setInputEmail('');
  };

  const handlePortal = async () => {
    if (!email) return;
    setPortalLoading(true);

    try {
      const res = await fetch('/api/customer-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } finally {
      setPortalLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-brand" />
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <section className="page-shell py-12 md:py-20">
        <div className="relative mx-auto max-w-md px-4 md:px-6">
          <FlowSteps current="miembros" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-3xl border border-brand/10 bg-white shadow-[0_30px_60px_-28px_rgba(13,92,99,0.35)]"
          >
            <div className="relative h-36">
              <Image src={IMAGES.members} alt="" fill className="object-cover" sizes="400px" />
              <div className="absolute inset-0 bg-brand/75" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="h-12 w-12 text-white" />
              </div>
            </div>
            <div className="p-8">
              <h1 className="text-center font-display text-2xl font-bold text-ink">{t('accessTitle')}</h1>
              <p className="mt-2 text-center text-ink-soft">{t('accessSubtitle')}</p>

              <form onSubmit={handleAccess} className="mt-6 space-y-4">
                <input
                  type="email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  className="input-field"
                  placeholder="tu@email.com"
                  required
                />
                {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
                <button type="submit" disabled={verifying} className="btn-accent w-full disabled:opacity-60">
                  {verifying ? <Loader2 className="h-5 w-5 animate-spin" /> : t('accessButton')}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-ink-faint">
                ¿Aún no tienes cuenta?{' '}
                <Link href={`/${locale}/inscripcion`} className="font-semibold text-brand hover:underline">
                  {tNav('enroll')}
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell py-12 md:py-20">
      <div className="relative mx-auto max-w-4xl px-4 md:px-6">
        <FlowSteps current="miembros" />

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-ink">{t('title')}</h1>
            <p className="mt-1 text-ink-soft">{t('subtitle')}</p>
            <p className="mt-1 text-sm font-medium text-brand">{email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handlePortal}
              disabled={portalLoading}
              className="btn-secondary !py-2 !text-sm"
            >
              {portalLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Settings className="h-4 w-4" />}
              {t('manageSubscription')}
            </button>
            <button type="button" onClick={handleLogout} className="btn-secondary !py-2 !text-sm">
              <LogOut className="h-4 w-4" />
              {t('logout')}
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 overflow-hidden rounded-3xl border border-brand/10 bg-white shadow-[0_20px_50px_-24px_rgba(13,92,99,0.3)]"
        >
          <div className="relative h-28 overflow-hidden bg-brand">
            <Image src={IMAGES.workspace} alt="" fill className="object-cover opacity-40" sizes="800px" />
            <div className="absolute inset-0 flex items-center px-6">
              <h2 className="font-display text-xl font-bold text-white md:text-2xl">{t('currentPack')}</h2>
            </div>
          </div>
          <div className="divide-y divide-brand/5">
            {CURRENT_PACK.templates.map((template, i) => {
              const Icon = formatIcons[template.format] || FileText;
              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-brand-light/40"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light">
                    <Icon className="h-6 w-6 text-brand" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-ink">{t(`templates.${template.nameKey}`)}</p>
                    <p className="text-sm text-ink-faint">{template.format}</p>
                  </div>
                  <a
                    href={template.file}
                    download
                    className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
                  >
                    <Download className="h-4 w-4" />
                    {t('download')}
                  </a>
                </motion.div>
              );
            })}
          </div>
          <div className="border-t border-brand/10 px-6 py-4">
            <a
              href="/packs/mar-2026/kitnegocio-pack-marzo.zip"
              download
              className="btn-accent w-full text-center sm:w-auto"
            >
              <Download className="h-5 w-5" />
              {t('downloadAll')}
            </a>
          </div>
        </motion.div>

        <div className="rounded-3xl border border-brand/10 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(13,92,99,0.25)]">
          <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-ink">
            <Archive className="h-5 w-5 text-accent" />
            {t('library')}
          </h2>
          <div className="space-y-4">
            {ARCHIVE_PACKS.map((pack) => (
              <div key={pack.id} className="rounded-xl border border-brand/10 bg-paper/80 p-4">
                <h3 className="mb-3 font-semibold text-ink">{t(`packs.${pack.nameKey}`)}</h3>
                <div className="flex flex-wrap gap-2">
                  {pack.templates.map((template) => (
                    <a
                      key={template.id}
                      href={template.file}
                      download
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-brand-light hover:text-brand"
                    >
                      <Download className="h-3.5 w-3.5" />
                      {t(`templates.${template.nameKey}`)}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <Link href={`/${locale}/soporte`} className="font-medium text-brand hover:underline">
            {tNav('support')}
          </Link>
          <Link href={`/${locale}`} className="inline-flex items-center gap-1 font-medium text-ink-soft hover:text-brand">
            Volver al inicio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
