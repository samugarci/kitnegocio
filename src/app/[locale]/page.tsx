import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import TemplatePreview from '@/components/TemplatePreview';
import Testimonials from '@/components/Testimonials';
import HowItWorks from '@/components/HowItWorks';
import FAQ from '@/components/FAQ';
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
      <Features />
      <TemplatePreview />
      <Testimonials />
      <HowItWorks />
      <FAQ />
      <Pricing />
      <FloatingCTA />
    </>
  );
}
