export type TemplateItem = {
  id: string;
  nameKey: string;
  format: string;
  file: string;
};

export type PackItem = {
  id: string;
  nameKey: string;
  month: string;
  templates: TemplateItem[];
};

export const CURRENT_PACK: PackItem = {
  id: 'mar-2026',
  nameKey: 'currentPack',
  month: '2026-03',
  templates: [
    { id: 'invoice', nameKey: 'invoice', format: 'CANVA', file: '/packs/mar-2026/factura-profesional.xlsx' },
    { id: 'quote', nameKey: 'quote', format: 'PDF', file: '/packs/mar-2026/presupuesto-comercial.xlsx' },
    { id: 'calendar', nameKey: 'calendar', format: 'CANVA', file: '/packs/mar-2026/calendario-ig.pdf' },
    { id: 'proposal', nameKey: 'proposal', format: 'PDF', file: '/packs/mar-2026/propuesta-servicios.pdf' },
    { id: 'checklist', nameKey: 'checklist', format: 'XLSX', file: '/packs/mar-2026/checklist-operativo.xlsx' },
    { id: 'guide', nameKey: 'guide', format: 'PDF', file: '/packs/mar-2026/guia-precios-freelancers.pdf' },
  ],
};

export const ARCHIVE_PACKS: PackItem[] = [
  {
    id: 'feb-2026',
    nameKey: 'feb2026',
    month: '2026-02',
    templates: [
      { id: 'invoice', nameKey: 'invoice', format: 'CANVA', file: '/packs/feb-2026/factura-profesional.xlsx' },
      { id: 'proposal', nameKey: 'proposal', format: 'PDF', file: '/packs/feb-2026/presupuesto-comercial.xlsx' },
    ],
  },
  {
    id: 'jan-2026',
    nameKey: 'jan2026',
    month: '2026-01',
    templates: [
      { id: 'invoice', nameKey: 'invoice', format: 'CANVA', file: '/packs/jan-2026/factura-profesional.xlsx' },
      { id: 'calendar', nameKey: 'calendar', format: 'CANVA', file: '/packs/jan-2026/calendario-ig.pdf' },
    ],
  },
];
