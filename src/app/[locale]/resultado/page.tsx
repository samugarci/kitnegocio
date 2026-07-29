import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import ResultClient from '@/components/ResultClient';

export default async function ResultadoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center">Loading...</div>}>
      <ResultClient />
    </Suspense>
  );
}
