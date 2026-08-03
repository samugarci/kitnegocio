'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CreditCard, Lock } from 'lucide-react';

type Brand = 'visa' | 'mastercard' | 'amex' | 'generic';

function detectBrand(digits: string): Brand {
  if (/^4/.test(digits)) return 'visa';
  if (/^3[47]/.test(digits)) return 'amex';
  if (/^(5[1-5]|2[2-7])/.test(digits)) return 'mastercard';
  return 'generic';
}

function formatCardNumber(raw: string, brand: Brand) {
  const d = raw.replace(/\D/g, '').slice(0, brand === 'amex' ? 15 : 16);
  if (brand === 'amex') {
    return d.replace(/(\d{1,4})(\d{1,6})?(\d{1,5})?/, (_, a, b, c) =>
      [a, b, c].filter(Boolean).join(' ')
    );
  }
  return d.replace(/(\d{1,4})/g, '$1 ').trim();
}

function formatExpiry(raw: string) {
  const d = raw.replace(/\D/g, '').slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

export type BankCardValues = {
  number: string;
  expiry: string;
  cvc: string;
  holder: string;
};

type Props = {
  value: BankCardValues;
  onChange: (next: BankCardValues) => void;
  labels: {
    number: string;
    expiry: string;
    cvc: string;
    holder: string;
    secureTitle: string;
    secureHint: string;
  };
};

export default function InteractiveBankCard({ value, onChange, labels }: Props) {
  const [flipped, setFlipped] = useState(false);
  const [focused, setFocused] = useState<'number' | 'expiry' | 'cvc' | 'holder' | null>(null);

  const digits = value.number.replace(/\D/g, '');
  const brand = useMemo(() => detectBrand(digits), [digits]);
  const displayNumber =
    formatCardNumber(digits, brand) ||
    (brand === 'amex' ? '•••• •••••• •••••' : '•••• •••• •••• ••••');
  const displayExpiry = value.expiry || 'MM/AA';
  const displayHolder = value.holder.trim().toUpperCase() || 'NOMBRE APELLIDO';
  const displayCvc = value.cvc ? value.cvc.replace(/\d/g, '•') : '•••';

  const set = (patch: Partial<BankCardValues>) => onChange({ ...value, ...patch });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <CreditCard className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold text-ink">{labels.secureTitle}</p>
            <p className="text-xs text-ink-faint">{labels.secureHint}</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
          <Lock className="h-3 w-3" />
          SSL 256-bit · PCI
        </span>
      </div>

      <div className="perspective-1000 relative mx-auto h-48 w-full max-w-md">
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 overflow-hidden rounded-2xl border border-white/20 p-5 text-white shadow-[0_28px_60px_-18px_rgba(7,24,34,0.75)]"
            style={{
              backfaceVisibility: 'hidden',
              background:
                'linear-gradient(145deg, #0c2a36 0%, #0E7490 42%, #0a4a5c 72%, #061820 100%)',
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,rgba(255,255,255,0.12)_50%,transparent_60%)] opacity-60" />
            <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 left-0 h-40 w-40 rounded-full bg-accent/25 blur-3xl" />

            <div className="relative flex items-start justify-between">
              <div className="relative">
                <div className="h-11 w-14 rounded-md bg-gradient-to-br from-[#f5e6c8] via-[#d4a84b] to-[#8a6a28] shadow-md" />
                <div className="absolute inset-0 rounded-md bg-[linear-gradient(135deg,rgba(255,255,255,0.45)_0%,transparent_45%)]" />
              </div>
              <BrandMark brand={brand} />
            </div>

            <p
              className={`relative mt-9 font-mono text-xl tracking-[0.2em] drop-shadow-sm md:text-[1.65rem] ${
                focused === 'number' ? 'text-[#FFD4C4]' : 'text-white'
              }`}
            >
              {displayNumber}
            </p>

            <div className="relative mt-7 flex items-end justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/50">
                  Titular
                </p>
                <p
                  className={`mt-0.5 truncate text-sm font-semibold tracking-[0.12em] ${
                    focused === 'holder' ? 'text-[#FFD4C4]' : 'text-white'
                  }`}
                >
                  {displayHolder}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/50">
                  Vence
                </p>
                <p
                  className={`mt-0.5 font-mono text-sm font-semibold ${
                    focused === 'expiry' ? 'text-[#FFD4C4]' : 'text-white'
                  }`}
                >
                  {displayExpiry}
                </p>
              </div>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 overflow-hidden rounded-2xl border border-white/15 text-white shadow-[0_28px_60px_-18px_rgba(7,24,34,0.75)]"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(160deg, #061820 0%, #0c2a36 55%, #0E7490 100%)',
            }}
          >
            <div className="mt-7 h-12 bg-black/80" />
            <div className="mt-5 px-5">
              <div className="flex items-center justify-end gap-3 rounded-md bg-gradient-to-r from-slate-100 to-white px-3 py-2.5 shadow-inner">
                <div className="h-2 flex-1 rounded-sm bg-[repeating-linear-gradient(90deg,#cbd5e1_0_2px,transparent_2px_4px)]" />
                <span
                  className={`min-w-[2.5rem] text-right font-mono text-sm font-bold tracking-widest text-ink ${
                    focused === 'cvc' ? 'text-accent' : ''
                  }`}
                >
                  {value.cvc || displayCvc}
                </span>
              </div>
              <p className="mt-3 text-right text-[10px] font-medium uppercase tracking-wider text-white/45">
                CVC / CVV
              </p>
              <p className="mt-4 text-[9px] leading-relaxed text-white/35">
                KitNegocio Pay · Authorized Merchant · Encrypted channel
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-3 rounded-xl border border-slate-200/90 bg-[#F7FAFC] p-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            {labels.number}
          </label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            value={formatCardNumber(digits, brand)}
            onChange={(e) => {
              const next = e.target.value.replace(/\D/g, '').slice(0, 16);
              set({ number: next });
              setFlipped(false);
            }}
            onFocus={() => {
              setFocused('number');
              setFlipped(false);
            }}
            onBlur={() => setFocused(null)}
            className="bank-input !border-slate-200 !bg-white font-mono tracking-wider"
            placeholder="ACCT-000003"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            {labels.expiry}
          </label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            value={value.expiry}
            onChange={(e) => {
              set({ expiry: formatExpiry(e.target.value) });
              setFlipped(false);
            }}
            onFocus={() => {
              setFocused('expiry');
              setFlipped(false);
            }}
            onBlur={() => setFocused(null)}
            className="bank-input !border-slate-200 !bg-white font-mono"
            placeholder="MM/AA"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            {labels.cvc}
          </label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="cc-csc"
            value={value.cvc}
            onChange={(e) => set({ cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })}
            onFocus={() => {
              setFocused('cvc');
              setFlipped(true);
            }}
            onBlur={() => {
              setFocused(null);
              setFlipped(false);
            }}
            className="bank-input !border-slate-200 !bg-white font-mono"
            placeholder="123"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            {labels.holder}
          </label>
          <input
            type="text"
            autoComplete="cc-name"
            value={value.holder}
            onChange={(e) => {
              set({ holder: e.target.value.slice(0, 32) });
              setFlipped(false);
            }}
            onFocus={() => {
              setFocused('holder');
              setFlipped(false);
            }}
            onBlur={() => setFocused(null)}
            className="bank-input !border-slate-200 !bg-white uppercase"
            placeholder="Como aparece en la tarjeta"
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
        <span>Visa</span>
        <span>Mastercard</span>
        <span>Amex</span>
        <span>Cifrado AES-256</span>
      </div>

      <AnimatePresence>
        {brand !== 'generic' && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-xs font-medium text-brand"
          >
            Tarjeta {brand === 'visa' ? 'Visa' : brand === 'mastercard' ? 'Mastercard' : 'American Express'} detectada
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function BrandMark({ brand }: { brand: Brand }) {
  if (brand === 'visa') {
    return <span className="font-display text-lg font-extrabold italic tracking-tight">VISA</span>;
  }
  if (brand === 'mastercard') {
    return (
      <span className="flex items-center">
        <span className="-mr-2 h-7 w-7 rounded-full bg-red-500/90" />
        <span className="h-7 w-7 rounded-full bg-amber-400/90" />
      </span>
    );
  }
  if (brand === 'amex') {
    return <span className="rounded bg-sky-400/20 px-2 py-0.5 text-xs font-bold">AMEX</span>;
  }
  return <span className="text-xs font-semibold uppercase tracking-widest text-white/70">KitNegocio Pay</span>;
}

/** Validación básica de tarjeta (UI). No se envía al servidor. */
export function isBankCardComplete(card: BankCardValues): boolean {
  const digits = card.number.replace(/\D/g, '');
  const [mm, yy] = card.expiry.split('/');
  const month = Number(mm);
  const year = Number(yy);
  const cvcOk = card.cvc.length >= 3;
  const holderOk = card.holder.trim().length >= 3;
  const numberOk = digits.length >= 15;
  const expiryOk =
    Boolean(mm && yy && mm.length === 2 && yy.length === 2) &&
    month >= 1 &&
    month <= 12 &&
    year >= 0;
  return numberOk && expiryOk && cvcOk && holderOk;
}
