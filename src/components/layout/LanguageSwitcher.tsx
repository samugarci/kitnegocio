'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { type Locale } from '@/i18n/config';

export default function LanguageSwitcher({
  light = false,
  compact = false,
}: {
  light?: boolean;
  compact?: boolean;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  if (compact) {
    const next = locale === 'es' ? 'en' : 'es';
    return (
      <button
        type="button"
        onClick={() => switchLocale(next)}
        className={`inline-flex h-9 items-center px-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
          light ? 'text-white/70 hover:text-white' : 'text-ink-faint hover:text-ink'
        }`}
        aria-label={locale === 'en' ? 'Switch language' : 'Cambiar idioma'}
      >
        {locale.toUpperCase()}
      </button>
    );
  }

  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={locale === 'en' ? 'Language selector' : 'Selector de idioma'}
    >
      {(['es', 'en'] as Locale[]).map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && (
            <span className={`mx-1 text-[10px] ${light ? 'text-white/25' : 'text-slate-300'}`}>
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => switchLocale(loc)}
            aria-pressed={locale === loc}
            aria-label={loc === 'es' ? 'Español' : 'English'}
            className={`px-1 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
              locale === loc
                ? light
                  ? 'text-white'
                  : 'text-ink'
                : light
                  ? 'text-white/40 hover:text-white/75'
                  : 'text-ink-faint hover:text-ink'
            }`}
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  );
}
