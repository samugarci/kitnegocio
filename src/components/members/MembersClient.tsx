'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Download,
  FileSpreadsheet,
  FileText,
  Palette,
  Loader2,
  LogOut,
  Archive,
  BookOpen,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle2,
  Crown,
  X,
  ShieldCheck,
  Lock,
  Scale,
  FileCheck2,
  UserRound,
  Mail,
  BadgeCheck,
} from 'lucide-react';
import { ARCHIVE_PACKS, CURRENT_PACK, FULL_PACK_ZIP, packDownloadUrl } from '@/lib/packs';
import { IMAGES } from '@/lib/images';
import Logo from '@/components/brand/Logo';

const formatIcons: Record<string, typeof FileText> = {
  XLSX: FileSpreadsheet,
  PDF: FileText,
  CANVA: Palette,
};

type AuthUser = {
  id: string;
  email: string;
  name: string;
  plan: string;
  status: string;
  role: 'super_admin' | 'buyer';
};

export default function MembersClient() {
  const t = useTranslations('members');
  const tErrors = useTranslations('errors');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [email, setEmail] = useState('cliente.demo@kitnegocio.com');
  const [password, setPassword] = useState('Cliente-MUCpNkdD!9');
  const [showPassword, setShowPassword] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [downloaded, setDownloaded] = useState<string[]>([]);
  const [showProfile, setShowProfile] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<
    (typeof CURRENT_PACK.templates)[number] | null
  >(null);

  const loadSession = async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    try {
      const res = await fetch('/api/auth/me', {
        credentials: 'include',
        signal: controller.signal,
        cache: 'no-store',
      });
      if (!res.ok) {
        setUser(null);
        return;
      }
      const data = await res.json();
      if (data.authenticated && data.user) {
        setUser(data.user as AuthUser);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      clearTimeout(timeout);
    }
  };

  useEffect(() => {
    // Precompile / warm auth APIs so the first real login is fast
    void fetch('/api/auth/me', { credentials: 'include', cache: 'no-store' }).catch(() => {});
    void fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: '', password: '' }),
    }).catch(() => {});
    loadSession();
  }, []);

  useEffect(() => {
    if (user?.role === 'super_admin') {
      router.replace(`/${locale}/admin`);
    }
  }, [locale, router, user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setVerifying(true);
    setError('');

    try {
      // No short abort: on OneDrive the first compile/login can exceed 12s
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t('noAccess'));
        setUser(null);
        return;
      }
      setUser(data.user as AuthUser);
      setPassword('');
      if (data.user?.role === 'super_admin') {
        router.replace(`/${locale}/admin`);
      }
    } catch {
      setError(tErrors('accessFailed'));
    } finally {
      setVerifying(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    setShowProfile(false);
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } finally {
      setUser(null);
      setEmail('cliente.demo@kitnegocio.com');
      setPassword('Cliente-MUCpNkdD!9');
      setDownloaded([]);
      setLoggingOut(false);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('kitnegocio_email');
      }
      router.replace(`/${locale}/miembros`);
    }
  };

  if (!user) {
    return (
      <section id="area-privada" className="relative min-h-screen overflow-hidden bg-[#F3F6F8] scroll-mt-24 py-8 md:py-12">
        <div className="relative mx-auto max-w-5xl px-4 md:px-6">
          <div className="mb-6 flex items-center justify-between gap-3">
            <Link href={`/${locale}`} aria-label="KitNegocio" className="inline-flex">
              <Logo markClassName="h-9 w-9" compact />
            </Link>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand"
            >
              <ArrowLeft className="h-4 w-4" />
              {locale === 'en' ? 'Back to home' : 'Volver al inicio'}
            </Link>
          </div>
          <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_30px_60px_-36px_rgba(15,23,42,0.4)]">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <aside className="relative min-h-[260px] overflow-hidden bg-ink text-white lg:min-h-full">
                <Image
                  src={IMAGES.members}
                  alt=""
                  fill
                  className="object-cover opacity-40"
                  sizes="420px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/88 to-brand/55" />
                <div className="relative flex h-full flex-col justify-between p-7 md:p-9">
                  <div>
                    <p className="font-display text-2xl font-extrabold">
                      Kit<span className="text-accent">Negocio</span>
                    </p>
                    <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
                      {locale === 'en' ? 'Secure member access' : 'Acceso seguro de miembros'}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-bold leading-tight">
                      {locale === 'en'
                        ? 'Your licensed library awaits'
                        : 'Tu biblioteca con licencia te espera'}
                    </h2>
                  </div>
                  <ul className="mt-8 space-y-2 text-sm text-white/70">
                    {[
                      locale === 'en' ? 'Encrypted private session' : 'Sesión privada cifrada',
                      locale === 'en' ? 'Protected catalog downloads' : 'Descargas protegidas',
                      locale === 'en' ? 'Personal commercial license' : 'Licencia comercial personal',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              <div className="bg-white p-7 md:p-9">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                  {locale === 'en' ? 'Authorized login' : 'Inicio autorizado'}
                </p>
                <h1 className="mt-2 font-display text-2xl font-bold text-ink md:text-3xl">
                  {t('accessTitle')}
                </h1>
                <p className="mt-2 text-sm text-ink-soft">{t('accessSubtitle')}</p>

                <form onSubmit={handleLogin} className="mt-6 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
                      {t('emailLabel')}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bank-input"
                      placeholder="tu@email.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
                      {t('passwordLabel')}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bank-input pr-11"
                        autoComplete="current-password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-brand"
                        aria-label="Toggle password"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
                  <button type="submit" disabled={verifying} className="btn-accent w-full disabled:opacity-60">
                    {verifying ? <Loader2 className="h-5 w-5 animate-spin" /> : t('accessButton')}
                  </button>
                  {verifying && (
                    <p className="text-center text-xs text-ink-soft">
                      {locale === 'en' ? 'Signing you in…' : 'Entrando a tu cuenta…'}
                    </p>
                  )}
                </form>

                <p className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-ink-faint">
                  {t('noAccountYet')}{' '}
                  <Link href={`/${locale}/inscripcion`} className="font-semibold text-brand hover:underline">
                    {tNav('enroll')}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (user.role === 'super_admin') {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#F3F6F8]">
        <Loader2 className="h-10 w-10 animate-spin text-brand" />
      </div>
    );
  }

  const es = locale !== 'en';
  const firstName = user.name.split(' ')[0] || user.name;
  const useSteps = es
    ? [
        {
          n: '01',
          title: 'Descarga tu guía',
          desc: 'Abre el PDF en tu celular o computadora. No necesitas instalar nada especial.',
        },
        {
          n: '02',
          title: 'Elige una pieza',
          desc: 'Cada guía te dice exactamente qué publicar o qué mensaje enviar hoy.',
        },
        {
          n: '03',
          title: 'Ponle tu marca',
          desc: 'Cambia nombre, producto, precio y fotos. El contenido queda 100% tuyo.',
        },
        {
          n: '04',
          title: 'Publica o responde',
          desc: 'Súbelo a Instagram o pégalo en WhatsApp Business. Así usas lo que compraste.',
        },
      ]
    : [
        {
          n: '01',
          title: 'Download your guide',
          desc: 'Open the PDF on your phone or computer. No special software needed.',
        },
        {
          n: '02',
          title: 'Pick one piece',
          desc: 'Each guide tells you exactly what to post or which message to send today.',
        },
        {
          n: '03',
          title: 'Make it yours',
          desc: 'Swap in your name, product, price and photos. The content becomes fully yours.',
        },
        {
          n: '04',
          title: 'Publish or reply',
          desc: 'Post on Instagram or paste into WhatsApp Business. That is how you use your purchase.',
        },
      ];

  const trustItems = es
    ? [
        {
          icon: ShieldCheck,
          title: 'Compra segura',
          desc: 'Pago único verificado. Tu acceso queda ligado a tu correo.',
        },
        {
          icon: Scale,
          title: 'Licencia clara',
          desc: 'Uso comercial para tu negocio. No para revender el pack.',
        },
        {
          icon: Lock,
          title: 'Área privada',
          desc: 'Solo tú entras con tu correo y contraseña. Sesión cifrada.',
        },
        {
          icon: FileCheck2,
          title: 'Producto concreto',
          desc: 'PDFs listos para usar hoy: publicar, vender y organizar tu mes.',
        },
      ]
    : [
        {
          icon: ShieldCheck,
          title: 'Secure purchase',
          desc: 'Verified one-time payment. Access is tied to your email.',
        },
        {
          icon: Scale,
          title: 'Clear license',
          desc: 'Commercial use for your business. Not for reselling the pack.',
        },
        {
          icon: Lock,
          title: 'Private area',
          desc: 'Only you sign in with your email and password. Encrypted session.',
        },
        {
          icon: FileCheck2,
          title: 'Concrete product',
          desc: 'PDFs ready to use today: publish, sell and plan your month.',
        },
      ];

  const markDownloaded = (file: string) => {
    setDownloaded((current) => (current.includes(file) ? current : [...current, file]));
  };

  return (
    <section id="area-privada" className="min-h-screen bg-[#F4F7F9] scroll-mt-24">
      {/* App chrome */}
      <div className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link href={`/${locale}`} aria-label="KitNegocio — inicio" className="shrink-0">
              <Logo markClassName="h-8 w-8" compact />
            </Link>
            <span className="hidden h-4 w-px bg-slate-200 sm:block" aria-hidden />
            <p className="hidden truncate text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:block">
              {es ? 'Biblioteca con licencia' : 'Licensed library'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowProfile(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-ink transition hover:border-brand/30 hover:bg-brand-light/50 hover:text-brand"
            >
              <UserRound className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{es ? 'Mi perfil' : 'My profile'}</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-ink-soft transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-60"
            >
              {loggingOut ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <LogOut className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{t('logout')}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        {/* Welcome — one composition */}
        <div className="relative overflow-hidden rounded-[1.75rem] bg-ink text-white shadow-[0_28px_60px_-36px_rgba(7,16,24,0.55)]">
          <div className="absolute inset-0">
            <Image
              src={IMAGES.members}
              alt=""
              fill
              priority
              quality={70}
              className="object-cover object-[70%_30%] opacity-45"
              sizes="(min-width:1152px) 1152px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/88 to-ink/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" />
          </div>

          <div className="relative grid gap-8 p-7 md:grid-cols-[1.2fr_0.8fr] md:p-10 lg:p-12">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
                {es ? 'Tu compra · Acceso completo' : 'Your purchase · Full access'}
              </p>
              <h1 className="mt-4 max-w-[14ch] font-display text-[2.1rem] font-bold leading-[1.08] tracking-[-0.03em] md:text-5xl">
                {es ? `Hola, ${firstName}` : `Hello, ${firstName}`}
              </h1>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/72 md:text-base">
                {es
                  ? 'Aquí está todo lo que compraste: guías PDF listas para publicar en Instagram y vender por WhatsApp. Claras, seguras y fáciles de usar a cualquier edad.'
                  : 'Here is everything you bought: PDF guides ready to publish on Instagram and sell on WhatsApp. Clear, safe and easy to use at any age.'}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={packDownloadUrl(FULL_PACK_ZIP)}
                  onClick={() => setDownloaded(CURRENT_PACK.templates.map((item) => item.file))}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
                >
                  <Download className="h-4 w-4" />
                  {es ? 'Descargar pack completo' : 'Download full pack'}
                </a>
                <a
                  href="#biblioteca"
                  className="inline-flex items-center justify-center gap-2 px-2 py-2 text-sm font-medium text-white/70 transition hover:text-white"
                >
                  {es ? 'Ver guías una por una' : 'Browse guides one by one'}
                  <span className="text-accent">↓</span>
                </a>
              </div>
            </div>

            <aside className="flex flex-col justify-end rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md md:p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">
                {es ? 'Resumen de tu licencia' : 'License summary'}
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <dt className="text-white/55">{es ? 'Plan' : 'Plan'}</dt>
                  <dd className="inline-flex items-center gap-1.5 font-semibold">
                    <Crown className="h-3.5 w-3.5 text-amber-300" />
                    {es ? 'Acceso Completo' : 'Full Access'}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <dt className="text-white/55">{es ? 'Estado' : 'Status'}</dt>
                  <dd className="inline-flex items-center gap-1.5 font-semibold text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {user.status === 'active'
                      ? es
                        ? 'Activa'
                        : 'Active'
                      : es
                        ? 'Demo'
                        : 'Demo'}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <dt className="text-white/55">{es ? 'Guías' : 'Guides'}</dt>
                  <dd className="font-semibold">{CURRENT_PACK.templates.length}</dd>
                </div>
                <div className="pt-1">
                  <dt className="text-white/55">{es ? 'Cuenta' : 'Account'}</dt>
                  <dd className="mt-1 break-all text-[13px] font-medium text-white/90">{user.email}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>

        {/* Trust — all ages */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200/90 bg-white px-4 py-4 shadow-[0_1px_0_rgba(15,23,42,0.03)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-light text-brand">
                <Icon className="h-4 w-4" />
              </span>
              <p className="mt-3 text-sm font-bold text-ink">{title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{desc}</p>
            </div>
          ))}
        </div>

        {/* How to use PDFs */}
        <div className="mt-12">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
              {es ? 'Cómo usar lo que compraste' : 'How to use what you bought'}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
              {es ? 'Tus PDFs sirven para publicar y vender hoy' : 'Your PDFs help you publish and sell today'}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
              {es
                ? 'No son archivos para guardar y olvidar. Cada guía es un paso concreto: abrir, adaptar y usar en redes.'
                : 'These are not files to save and forget. Each guide is a concrete step: open, adapt and use on social.'}
            </p>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {useSteps.map((step) => (
              <div
                key={step.n}
                className="rounded-2xl border border-slate-200/90 bg-white p-5 transition hover:border-brand/25"
              >
                <p className="font-display text-2xl font-bold text-brand/25">{step.n}</p>
                <h3 className="mt-2 text-base font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Library */}
        <div id="biblioteca" className="mt-14 scroll-mt-28">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                {es ? 'Colección activa' : 'Active collection'}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold text-ink md:text-3xl">{t('currentPack')}</h2>
              <p className="mt-2 max-w-xl text-sm text-ink-soft">
                {es
                  ? 'Cada tarjeta te dice para qué sirve el PDF y cómo usarlo. Elige una y empieza.'
                  : 'Each card tells you what the PDF is for and how to use it. Pick one and start.'}
              </p>
            </div>
            <a
              href={packDownloadUrl(FULL_PACK_ZIP)}
              onClick={() => setDownloaded(CURRENT_PACK.templates.map((item) => item.file))}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-ink bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink/90"
            >
              <Download className="h-4 w-4" />
              {t('downloadAll')}
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {CURRENT_PACK.templates.map((template, index) => {
              const Icon = formatIcons[template.format] || FileText;
              const description = es ? template.descriptionEs : template.descriptionEn;
              const useFor = es ? template.useForEs : template.useForEn;
              const done = downloaded.includes(template.file);
              return (
                <article
                  key={template.id}
                  className="group flex flex-col overflow-hidden rounded-[1.35rem] border border-slate-200/90 bg-white shadow-[0_12px_30px_-24px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-28px_rgba(14,116,144,0.4)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                    <Image
                      src={template.cover || IMAGES.workspace}
                      alt=""
                      fill
                      quality={65}
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width:1280px) 33vw, (min-width:640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                    <div className="absolute left-3 top-3 flex items-center gap-2">
                      <span className="rounded-lg bg-white px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-brand">
                        {template.format}
                      </span>
                      <span className="rounded-lg bg-ink/55 px-2 py-1 text-[10px] font-bold text-white backdrop-blur">
                        {String(index + 1).padStart(2, '0')} · {template.pages}{' '}
                        {es ? 'pág.' : 'p.'}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/12 text-white backdrop-blur">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-[1.05rem] font-bold leading-snug text-ink">
                      {t(`templates.${template.nameKey}`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p>

                    {useFor && (
                      <div className="mt-4 rounded-xl bg-[#F3F8FA] px-3.5 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand">
                          {es ? 'Úsalo así' : 'Use it like this'}
                        </p>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-ink">{useFor}</p>
                      </div>
                    )}

                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPreviewTemplate(template)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-ink-soft transition hover:border-brand/30 hover:bg-brand-light hover:text-brand"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        {es ? 'Ver detalle' : 'See details'}
                      </button>
                      <a
                        href={packDownloadUrl(template.file)}
                        onClick={() => markDownloaded(template.file)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand px-3 py-2.5 text-xs font-bold text-white transition hover:bg-brand-dark"
                      >
                        {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
                        {done ? (es ? 'Listo' : 'Ready') : es ? 'Descargar' : 'Download'}
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Archive */}
        <div className="mt-14 rounded-[1.75rem] border border-slate-200/90 bg-white p-6 md:p-8">
          <div className="mb-5 flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent">
              <Archive className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold text-ink">{t('library')}</h2>
              <p className="mt-1 text-sm text-ink-soft">
                {es
                  ? 'Packs anteriores incluidos en tu Acceso Completo. Mismos derechos de uso.'
                  : 'Previous packs included with Full Access. Same usage rights.'}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {ARCHIVE_PACKS.map((pack) => (
              <div key={pack.id} className="rounded-2xl bg-[#F7FAFC] p-4 md:p-5">
                <h3 className="mb-3 text-sm font-bold text-ink">{t(`packs.${pack.nameKey}`)}</h3>
                <div className="flex flex-wrap gap-2">
                  {pack.templates.map((template) => (
                    <a
                      key={template.id}
                      href={packDownloadUrl(template.file)}
                      onClick={() => markDownloaded(template.file)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white bg-white px-3 py-2 text-sm font-medium text-ink-soft shadow-sm transition hover:border-brand/25 hover:text-brand"
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

        {/* Legal calm footer */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-5 py-6 md:px-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="font-display text-base font-bold text-ink">
                {es ? 'Compra transparente' : 'Transparent purchase'}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {es
                  ? 'Pagaste una sola vez. Puedes usar estos materiales en tu propio negocio. No los revendás ni los compartas como producto. Si tienes dudas, el soporte está disponible.'
                  : 'You paid once. You may use these materials in your own business. Do not resell or share them as a product. If you have questions, support is available.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <Link
                href={`/${locale}/terminos`}
                className="rounded-xl border border-slate-200 px-3 py-2 text-ink-soft transition hover:border-brand/30 hover:text-brand"
              >
                {es ? 'Términos' : 'Terms'}
              </Link>
              <Link
                href={`/${locale}/privacidad`}
                className="rounded-xl border border-slate-200 px-3 py-2 text-ink-soft transition hover:border-brand/30 hover:text-brand"
              >
                {es ? 'Privacidad' : 'Privacy'}
              </Link>
              <Link
                href={`/${locale}/soporte`}
                className="rounded-xl bg-brand px-3 py-2 text-white transition hover:bg-brand-dark"
              >
                {tNav('support')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showProfile && (
        <div
          className="fixed inset-0 z-[85] flex items-end justify-center bg-ink/55 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => setShowProfile(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="profile-title"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-[1.5rem] bg-white shadow-2xl"
          >
            <div className="border-b border-slate-100 px-6 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                    {es ? 'Cuenta verificada' : 'Verified account'}
                  </p>
                  <h2 id="profile-title" className="mt-1 font-display text-xl font-bold text-ink">
                    {es ? 'Mi perfil' : 'My profile'}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowProfile(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-ink-soft transition hover:bg-slate-50"
                  aria-label={es ? 'Cerrar' : 'Close'}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4 px-6 py-5">
              <div className="flex items-center gap-3 rounded-2xl bg-[#F4F7F9] p-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-lg font-bold text-white">
                  {(user.name || user.email).charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-base font-bold text-ink">{user.name}</p>
                  <p className="truncate text-sm text-ink-soft">{user.email}</p>
                </div>
              </div>

              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-3.5 py-3">
                  <dt className="inline-flex items-center gap-2 text-ink-soft">
                    <Mail className="h-4 w-4 text-brand" />
                    {es ? 'Correo' : 'Email'}
                  </dt>
                  <dd className="max-w-[55%] truncate text-right font-semibold text-ink">{user.email}</dd>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-3.5 py-3">
                  <dt className="inline-flex items-center gap-2 text-ink-soft">
                    <Crown className="h-4 w-4 text-amber-500" />
                    {es ? 'Plan' : 'Plan'}
                  </dt>
                  <dd className="font-semibold text-ink">{es ? 'Acceso Completo' : 'Full Access'}</dd>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-3.5 py-3">
                  <dt className="inline-flex items-center gap-2 text-ink-soft">
                    <BadgeCheck className="h-4 w-4 text-emerald-600" />
                    {es ? 'Estado' : 'Status'}
                  </dt>
                  <dd className="font-semibold text-emerald-700">
                    {user.status === 'active' ? (es ? 'Licencia activa' : 'Active license') : es ? 'Demo' : 'Demo'}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-3.5 py-3">
                  <dt className="inline-flex items-center gap-2 text-ink-soft">
                    <ShieldCheck className="h-4 w-4 text-brand" />
                    {es ? 'Guías incluidas' : 'Guides included'}
                  </dt>
                  <dd className="font-semibold text-ink">{CURRENT_PACK.templates.length}</dd>
                </div>
              </dl>

              <p className="text-[12px] leading-relaxed text-ink-faint">
                {es
                  ? 'Tu acceso está ligado a este correo. Si necesitas ayuda, escribe a soporte desde el enlace de abajo.'
                  : 'Your access is tied to this email. If you need help, contact support from the link below.'}
              </p>
            </div>

            <div className="grid gap-2 border-t border-slate-100 px-6 py-4 sm:grid-cols-2">
              <Link
                href={`/${locale}/soporte`}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-ink transition hover:border-brand/30 hover:text-brand"
                onClick={() => setShowProfile(false)}
              >
                {tNav('support')}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-ink/90 disabled:opacity-60"
              >
                {loggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                {t('logout')}
              </button>
            </div>
          </div>
        </div>
      )}

      {previewTemplate && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
          onClick={() => setPreviewTemplate(null)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[1.75rem] bg-white shadow-2xl"
          >
            <div className="relative h-52 overflow-hidden bg-ink md:h-60">
              <Image
                src={previewTemplate.cover || IMAGES.workspace}
                alt=""
                fill
                className="object-cover"
                sizes="700px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-ink/55 text-white"
                aria-label={es ? 'Cerrar' : 'Close'}
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="rounded-md bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                  {es ? 'Guía con licencia' : 'Licensed guide'}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">
                  {t(`templates.${previewTemplate.nameKey}`)}
                </h3>
              </div>
            </div>
            <div className="grid gap-6 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8">
              <div>
                <h4 className="font-display text-xl font-bold text-ink">
                  {es ? 'Qué incluye' : 'What is included'}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {es ? previewTemplate.descriptionEs : previewTemplate.descriptionEn}
                </p>
                {(es ? previewTemplate.useForEs : previewTemplate.useForEn) && (
                  <div className="mt-4 rounded-xl border border-brand/15 bg-brand-light/60 px-4 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand">
                      {es ? 'Úsalo hoy' : 'Use it today'}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink">
                      {es ? previewTemplate.useForEs : previewTemplate.useForEn}
                    </p>
                  </div>
                )}
                <div className="mt-5 grid gap-2.5">
                  {(es ? previewTemplate.includesEs : previewTemplate.includesEn)?.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-[#F7FAFC] p-3"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <p className="text-sm font-semibold text-ink">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <aside className="rounded-2xl bg-ink p-5 text-white">
                <BookOpen className="h-6 w-6 text-brand-muted" />
                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
                  {es ? 'Documento' : 'Document'}
                </p>
                <p className="mt-2 font-display text-2xl font-bold">
                  {previewTemplate.pages} {es ? 'páginas' : 'pages'}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-white/55">
                  {es
                    ? 'Descárgalo, ábrelo y sigue la instrucción “Úsalo así” de la guía.'
                    : 'Download it, open it and follow the “Use it like this” instruction.'}
                </p>
                <a
                  href={packDownloadUrl(previewTemplate.file)}
                  onClick={() => {
                    markDownloaded(previewTemplate.file);
                    setPreviewTemplate(null);
                  }}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white hover:bg-accent-dark"
                >
                  <Download className="h-4 w-4" />
                  {es ? 'Descargar esta guía' : 'Download this guide'}
                </a>
              </aside>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
