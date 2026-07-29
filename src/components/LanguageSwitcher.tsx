'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { localeNames, type Locale } from '@/i18n/config';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div className="relative flex items-center gap-1">
      <Globe className={`h-4 w-4 ${light ? 'text-white/70' : 'text-ink-faint'}`} />
      {(Object.keys(localeNames) as Locale[]).map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`rounded-lg px-2 py-1 text-sm font-medium transition-colors ${
            locale === loc
              ? light
                ? 'bg-white text-ink'
                : 'bg-brand text-white'
              : light
                ? 'text-white/70 hover:bg-white/15 hover:text-white'
                : 'text-ink-soft hover:bg-brand-light hover:text-brand'
          }`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
