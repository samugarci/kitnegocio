'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, Mail, Clock, HeadphonesIcon, ArrowLeft } from 'lucide-react';
import { IMAGES } from '@/lib/images';

export default function SupportForm() {
  const t = useTranslations('support');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('subscription');
  const [message, setMessage] = useState('');
  const [paymentRef, setPaymentRef] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const subjects = ['subscription', 'download', 'billing', 'other'] as const;
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'soporte@kitnegocio.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, paymentRef }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTicketId(data.ticketId);
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-brand/10 bg-brand-light p-8 text-center">
        <p className="font-display text-lg font-semibold text-brand">{t('success')}</p>
        {ticketId && (
          <p className="mt-2 text-sm text-ink-soft">
            Ticket: <code className="font-mono">{ticketId}</code>
          </p>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href={`/${locale}/miembros`} className="btn-secondary !py-2 !text-sm">
            {tNav('members')}
          </Link>
          <Link href={`/${locale}`} className="btn-primary !py-2 !text-sm">
            Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid overflow-hidden rounded-3xl border border-brand/10 bg-white shadow-[0_30px_60px_-28px_rgba(13,92,99,0.3)] lg:grid-cols-5">
      <div className="relative hidden lg:col-span-2 lg:block">
        <Image src={IMAGES.support} alt="Equipo de soporte" fill className="object-cover" sizes="40vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/70 to-brand/30" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
          <HeadphonesIcon className="mb-4 h-10 w-10 text-accent" />
          <p className="font-display text-2xl font-bold">{t('contactInfo')}</p>
          <div className="mt-4 space-y-3 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              <a href={`mailto:${supportEmail}`} className="hover:underline">
                {supportEmail}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 text-accent" />
              <div>
                <p className="font-medium text-white">{t('hours')}</p>
                <p>{t('hoursValue')}</p>
              </div>
            </div>
            <p>
              <span className="font-medium text-white">{t('response')}: </span>
              {t('responseValue')}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-8 lg:col-span-3 md:p-10">
        <Link href={`/${locale}`} className="inline-flex items-center gap-1 text-sm text-ink-faint hover:text-brand">
          <ArrowLeft className="h-4 w-4" /> Inicio
        </Link>
        <div>
          <label className="mb-1 block text-sm font-medium">{t('name')}</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t('email')}</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t('subject')}</label>
          <select value={subject} onChange={(e) => setSubject(e.target.value)} className="input-field">
            {subjects.map((s) => (
              <option key={s} value={s}>
                {t(`subjects.${s}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t('paymentRef')}</label>
          <input type="text" value={paymentRef} onChange={(e) => setPaymentRef(e.target.value)} className="input-field" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t('message')}</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="input-field resize-none"
            required
          />
        </div>
        <button type="submit" disabled={loading} className="btn-accent w-full disabled:opacity-60">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : t('send')}
        </button>
      </form>
    </div>
  );
}
