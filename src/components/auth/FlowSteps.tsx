'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Check, Download, BadgeCheck, UserRound } from 'lucide-react';

const STEPS = [
  {
    key: 'inscripcion',
    path: 'inscripcion',
    labelEs: 'Crear cuenta',
    labelEn: 'Create account',
    icon: UserRound,
  },
  {
    key: 'resultado',
    path: 'resultado',
    labelEs: 'Confirmar',
    labelEn: 'Confirm',
    icon: BadgeCheck,
  },
  {
    key: 'miembros',
    path: 'miembros',
    labelEs: 'Acceso',
    labelEn: 'Access',
    icon: Download,
  },
] as const;

export default function FlowSteps({
  current,
  embedded = false,
}: {
  current: 'inscripcion' | 'resultado' | 'miembros';
  embedded?: boolean;
}) {
  const locale = useLocale();
  const currentIndex = STEPS.findIndex((s) => s.key === current);
  const isEnglish = locale === 'en';

  return (
    <nav
      aria-label={isEnglish ? 'Secure purchase progress' : 'Progreso de compra segura'}
      className={
        embedded
          ? 'border-b border-white/10 bg-ink/40 px-5 py-4'
          : 'mb-2 overflow-hidden rounded-[1.5rem] border border-brand/10 bg-ink text-white shadow-[0_24px_50px_-30px_rgba(11,18,32,0.55)]'
      }
    >
      <div className={embedded ? '' : 'px-5 py-4 md:px-6'}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="font-display text-sm font-bold tracking-tight">
              {isEnglish ? 'Secure purchase' : 'Compra segura'}
            </p>
            <p className="text-[11px] text-white/50">
              {isEnglish ? 'Encrypted · One-time $19.99' : 'Cifrado · Pago único $19.99'}
            </p>
          </div>
          <span className="text-[11px] font-semibold text-accent">
            {isEnglish
              ? `Step ${currentIndex + 1} of 3`
              : `Paso ${currentIndex + 1} de 3`}
          </span>
        </div>

        <div className="mb-4 h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand to-accent transition-all duration-700"
            style={{ width: `${((currentIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <ol className="grid grid-cols-3 gap-2">
          {STEPS.map((step, i) => {
            const done = i < currentIndex;
            const active = i === currentIndex;
            const Icon = step.icon;
            const label = isEnglish ? step.labelEn : step.labelEs;
            const inner = (
              <span className="flex flex-col items-center gap-2 text-center">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                    done
                      ? 'bg-brand text-white'
                      : active
                        ? 'bg-accent text-white shadow-[0_10px_24px_-12px_rgba(240,89,42,0.8)]'
                        : 'bg-white/10 text-white/45'
                  }`}
                >
                  {done ? <Check className="h-4 w-4" strokeWidth={2.8} /> : <Icon className="h-4 w-4" />}
                </span>
                <span
                  className={`text-[11px] font-semibold ${
                    active ? 'text-white' : done ? 'text-white/80' : 'text-white/40'
                  }`}
                >
                  {label}
                </span>
              </span>
            );

            return (
              <li key={step.key}>
                {done ? (
                  <Link
                    href={`/${locale}/${step.path}`}
                    className="block rounded-xl p-2 transition hover:bg-white/5"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    aria-current={active ? 'step' : undefined}
                    className={`rounded-xl p-2 ${active ? 'bg-white/5' : ''}`}
                  >
                    {inner}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
