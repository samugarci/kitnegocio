import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import MembersClient from '@/components/MembersClient';

export default async function MiembrosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center bg-paper text-ink-soft">
          Loading...
        </div>
      }
    >
      <MembersClient />
    </Suspense>
  );
}
