export type TemplateItem = {
  id: string;
  nameKey: string;
  format: string;
  /** Relative path under packs/, used by /api/download */
  file: string;
  cover?: string;
  pages?: number;
  descriptionEs?: string;
  descriptionEn?: string;
  useForEs?: string;
  useForEn?: string;
  includesEs?: string[];
  includesEn?: string[];
};

export type PackItem = {
  id: string;
  nameKey: string;
  month: string;
  templates: TemplateItem[];
};

export function packDownloadUrl(file: string): string {
  const normalized = file.replace(/^\/+/, '').replace(/^packs\//, '');
  return `/api/download?file=${encodeURIComponent(normalized)}`;
}

export const CURRENT_PACK: PackItem = {
  id: 'mar-2026',
  nameKey: 'currentPack',
  month: '2026-03',
  templates: [
    {
      id: 'invoice',
      nameKey: 'invoice',
      format: 'PDF',
      file: 'mar-2026/guia-instagram-30-posts.pdf',
      cover: '/kitnegocio-feed-premium.webp',
      pages: 9,
      descriptionEs: 'Sistema de 30 publicaciones para atraer, educar, crear confianza y vender.',
      descriptionEn: 'A 30-post system to attract, educate, build trust and sell.',
      useForEs: 'Abre el PDF, elige 7 posts de la semana, copia la estructura a Canva o Stories y publica con tu producto.',
      useForEn: 'Open the PDF, pick 7 posts for the week, copy the structure into Canva or Stories, and publish with your product.',
      includesEs: ['Distribución de contenido', 'Fórmula de carruseles', 'Métricas semanales'],
      includesEn: ['Content distribution', 'Carousel formula', 'Weekly metrics'],
    },
    {
      id: 'quote',
      nameKey: 'quote',
      format: 'PDF',
      file: 'mar-2026/guia-reels-12-guiones.pdf',
      cover: '/kitnegocio-reels-premium.webp',
      pages: 9,
      descriptionEs: '12 formatos de video con ganchos, tomas, guion y llamado a la acción.',
      descriptionEn: '12 video formats with hooks, shots, scripts and calls to action.',
      useForEs: 'Elige 1 guion, grábate con el celular siguiendo las tomas y publica el Reel con el CTA del PDF.',
      useForEn: 'Pick 1 script, film on your phone following the shots, and post the Reel with the PDF’s CTA.',
      includesEs: ['12 ideas de Reels', 'Producción con móvil', 'CTA por objetivo'],
      includesEn: ['12 Reel ideas', 'Mobile production', 'Goal-based CTAs'],
    },
    {
      id: 'calendar',
      nameKey: 'calendar',
      format: 'PDF',
      file: 'mar-2026/guia-stories-conversion.pdf',
      cover: '/kitnegocio-hero-premium.webp',
      pages: 9,
      descriptionEs: 'Secuencias de Stories para interacción, confianza, catálogo y cierre.',
      descriptionEn: 'Story sequences for interaction, trust, catalog and closing.',
      useForEs: 'Sigue la secuencia de 5 Stories: saludo → valor → prueba → oferta → pregunta. Úsala hoy en Instagram.',
      useForEn: 'Follow the 5-Story sequence: hello → value → proof → offer → question. Use it on Instagram today.',
      includesEs: ['Secuencia de 5 Stories', 'Stickers con intención', 'Venta por respuestas'],
      includesEn: ['5-Story sequence', 'Intentional stickers', 'Selling through replies'],
    },
    {
      id: 'proposal',
      nameKey: 'proposal',
      format: 'PDF',
      file: 'mar-2026/catalogo-whatsapp-ventas.pdf',
      cover: '/kitnegocio-whatsapp-premium.webp',
      pages: 9,
      descriptionEs: 'Catálogo comercial, atención, objeciones y seguimiento en WhatsApp.',
      descriptionEn: 'Commercial catalog, service, objections and WhatsApp follow-up.',
      useForEs: 'Copia los mensajes como respuestas rápidas en WhatsApp Business y úsalos cuando te escriba un cliente.',
      useForEn: 'Save the messages as WhatsApp Business quick replies and use them when a customer messages you.',
      includesEs: ['Catálogo profesional', 'Respuestas rápidas', 'Flujo de seguimiento'],
      includesEn: ['Professional catalog', 'Quick replies', 'Follow-up flow'],
    },
    {
      id: 'checklist',
      nameKey: 'checklist',
      format: 'PDF',
      file: 'mar-2026/calendario-crecimiento-30-dias.pdf',
      cover: '/kitnegocio-hero-premium.webp',
      pages: 9,
      descriptionEs: 'Plan diario de 30 días para posicionamiento, comunidad y conversión.',
      descriptionEn: 'A 30-day daily plan for positioning, community and conversion.',
      useForEs: 'Marca el día de hoy en el calendario y cumple la tarea de 30 minutos. Repite mañana.',
      useForEn: 'Mark today’s date on the calendar and complete the 30-minute task. Repeat tomorrow.',
      includesEs: ['4 semanas estratégicas', 'Rutina de 30 minutos', 'Tablero mensual'],
      includesEn: ['4 strategic weeks', '30-minute routine', 'Monthly dashboard'],
    },
    {
      id: 'guide',
      nameKey: 'guide',
      format: 'PDF',
      file: 'mar-2026/banco-captions-hashtags.pdf',
      cover: '/kitnegocio-feed-premium.webp',
      pages: 9,
      descriptionEs: 'Fórmulas de copy, CTA y palabras clave para mover a la acción.',
      descriptionEn: 'Copy, CTA and keyword formulas that move people to action.',
      useForEs: 'Copia un caption, cambia el producto/nombre de tu marca y pégalo debajo de tu post o Reel.',
      useForEn: 'Copy a caption, swap in your product/brand name, and paste it under your post or Reel.',
      includesEs: ['Captions educativos', 'Textos de venta', 'Banco de CTA y hashtags'],
      includesEn: ['Educational captions', 'Sales copy', 'CTA and hashtag bank'],
    },
  ],
};

export const ARCHIVE_PACKS: PackItem[] = [
  {
    id: 'feb-2026',
    nameKey: 'feb2026',
    month: '2026-02',
    templates: [
      { id: 'invoice', nameKey: 'invoice', format: 'CANVA', file: 'feb-2026/factura-profesional.xlsx' },
      { id: 'proposal', nameKey: 'proposal', format: 'PDF', file: 'feb-2026/presupuesto-comercial.xlsx' },
    ],
  },
  {
    id: 'jan-2026',
    nameKey: 'jan2026',
    month: '2026-01',
    templates: [
      { id: 'invoice', nameKey: 'invoice', format: 'CANVA', file: 'jan-2026/factura-profesional.xlsx' },
      { id: 'calendar', nameKey: 'calendar', format: 'CANVA', file: 'jan-2026/calendario-ig.pdf' },
    ],
  },
];

export const FULL_PACK_ZIP = 'mar-2026/kitnegocio-pack-marzo.zip';
