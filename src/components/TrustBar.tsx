'use client';

import { useTranslations } from 'next-intl';
import { Zap, Sparkles, ShieldCheck, CreditCard } from 'lucide-react';

const icons = [Zap, Sparkles, ShieldCheck, CreditCard];

export default function TrustBar() {
  const t = useTranslations('trustBar');
  const items = t.raw('items') as string[];

  return (
    <section className="relative z-10 -mt-px border-y border-white/10 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-3 gap-y-4 px-4 py-6 sm:gap-5 sm:px-6 sm:py-7 md:grid-cols-4">
        {items.map((label, i) => {
          const Icon = icons[i] ?? Sparkles;
          return (
            <div key={label} className="flex items-start gap-2.5 sm:items-center sm:gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent sm:h-10 sm:w-10">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <p className="pt-0.5 text-[12px] font-semibold leading-snug text-white/90 sm:text-sm">
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
