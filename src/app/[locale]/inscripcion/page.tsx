import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import EnrollmentForm from '@/components/EnrollmentForm';

export default async function InscripcionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="page-shell py-12 md:py-20">
      <div className="relative mx-auto max-w-6xl px-4 md:px-6 lg:max-w-7xl">
        <Suspense fallback={<div className="text-center text-ink-soft">Loading...</div>}>
          <EnrollmentForm />
        </Suspense>
      </div>
    </section>
  );
}
