import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import HowItWorks from '@/components/HowItWorks';
import Pricing from '@/components/Pricing';
import FloatingCTA from '@/components/FloatingCTA';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Pricing />
      <FloatingCTA />
    </>
  );
}
