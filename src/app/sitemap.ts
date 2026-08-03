import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kitnegocio.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['es', 'en'] as const;
  const paths = [
    '',
    '/inscripcion',
    '/soporte',
    '/terminos',
    '/privacidad',
    '/cookies',
    '/aviso-legal',
  ];

  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const path of paths) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path.startsWith('/terminos') || path.includes('legal') || path.includes('privacidad') || path.includes('cookies') || path.includes('aviso')
          ? 'monthly'
          : 'weekly',
        priority: path === '' ? 1 : path.includes('terminos') || path.includes('privacidad') ? 0.8 : 0.6,
      });
    }
  }
  return entries;
}
