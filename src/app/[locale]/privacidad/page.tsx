import { setRequestLocale } from 'next-intl/server';
import LegalContent from '@/components/LegalContent';
import Link from 'next/link';

export default async function PrivacidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <section className="page-shell py-12 md:py-20">
      <div className="relative mx-auto max-w-4xl px-4 md:px-6">
        <Link href={`/${locale}`} className="mb-6 inline-block text-sm text-ink-faint hover:text-brand">
          ← KitNegocio
        </Link>
        <div className="rounded-3xl border border-brand/10 bg-white p-8 md:p-12">
          <LegalContent page="privacy" locale={locale} />
        </div>
      </div>
    </section>
  );
}
