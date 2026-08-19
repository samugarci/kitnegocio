import { setRequestLocale } from 'next-intl/server';
import {
  FAQ,
  Features,
  FloatingCTA,
  Hero,
  HowItWorks,
  MarketEdge,
  Pricing,
  TemplatePreview,
  Testimonials,
  TrustBar,
  VisualPillars,
} from '@/components/landing';

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
      <VisualPillars />
      <Features />
      <TemplatePreview />
      <HowItWorks />
      <MarketEdge />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FloatingCTA />
    </>
  );
}
