'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Check } from 'lucide-react';

const STEPS = [
  { key: 'inscripcion', path: 'inscripcion', labelEs: 'Registro', labelEn: 'Sign up' },
  { key: 'resultado', path: 'resultado', labelEs: 'Confirmación', labelEn: 'Confirm' },
  { key: 'miembros', path: 'miembros', labelEs: 'Descargas', labelEn: 'Downloads' },
] as const;

export default function FlowSteps({ current }: { current: 'inscripcion' | 'resultado' | 'miembros' }) {
  const locale = useLocale();
  const currentIndex = STEPS.findIndex((s) => s.key === current);

  return (
    <nav aria-label="Progreso" className="mb-8 md:mb-10">
      <ol className="mx-auto flex max-w-2xl items-center">
        {STEPS.map((step, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          const label = locale === 'en' ? step.labelEn : step.labelEs;

          return (
            <li key={step.key} className="flex flex-1 items-center last:flex-none">
              <Link
                href={`/${locale}/${step.path}`}
                className="group flex flex-col items-center gap-2 text-center"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${
                    done
                      ? 'border-brand bg-brand text-white shadow-sm'
                      : active
                        ? 'border-accent bg-white text-accent shadow-[0_0_0_4px_rgba(240,89,42,0.15)]'
                        : 'border-slate-200 bg-white text-slate-400'
                  }`}
                >
                  {done ? <Check className="h-4 w-4" strokeWidth={2.5} /> : i + 1}
                </span>
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[0.08em] sm:text-xs ${
                    active ? 'text-ink' : done ? 'text-brand' : 'text-slate-400'
                  }`}
                >
                  {label}
                </span>
              </Link>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-2 mb-6 h-px flex-1 sm:mx-4 ${
                    done ? 'bg-brand' : 'bg-slate-200'
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
