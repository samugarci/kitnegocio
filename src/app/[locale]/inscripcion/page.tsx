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
    <section className="relative overflow-hidden bg-paper py-8 md:py-14">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <Suspense
          fallback={
            <div className="flex min-h-[40vh] items-center justify-center text-ink-soft">
              Loading...
            </div>
          }
        >
          <EnrollmentForm />
        </Suspense>
      </div>
    </section>
  );
}
