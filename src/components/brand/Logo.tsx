'use client';

type LogoProps = {
  className?: string;
  markClassName?: string;
  wordmark?: boolean;
  inverted?: boolean;
  compact?: boolean;
};

/** Marca KN: capas de contenido (feed / stories / mensajes) */
export function LogoMark({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        <rect width="48" height="48" rx="12" className="fill-brand" />
        <rect x="10" y="12" width="28" height="8" rx="2.5" className="fill-white/95" />
        <rect x="10" y="23" width="20" height="6" rx="2" className="fill-accent" />
        <rect x="10" y="32" width="24" height="5" rx="2" className="fill-white/55" />
        <circle cx="36" cy="34" r="5" className="fill-accent" />
        <path
          d="M34.2 34 L35.6 35.4 L38.2 32.4"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function Logo({
  className = '',
  markClassName = 'h-10 w-10',
  wordmark = true,
  inverted = false,
  compact = false,
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName} />
      {wordmark && (
        <span
          className={`font-display font-bold tracking-[-0.02em] ${
            compact ? 'text-base sm:text-lg' : 'text-[1.35rem] md:text-xl'
          } ${inverted ? 'text-white' : 'text-ink'}`}
        >
          Kit
          <span className={inverted ? 'text-accent' : 'text-brand'}>Negocio</span>
        </span>
      )}
    </span>
  );
}
