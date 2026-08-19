import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SupportForm } from '@/components/support';

export default async function SoportePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('support');

  return (
    <section className="page-shell py-12 md:py-20">
      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl font-bold text-ink md:text-4xl">{t('title')}</h1>
          <p className="mt-3 text-ink-soft">{t('subtitle')}</p>
        </div>
        <SupportForm />
      </div>
    </section>
  );
}
