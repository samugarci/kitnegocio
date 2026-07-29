export type FeatureKey =
  | 'invoice'
  | 'quote'
  | 'calendar'
  | 'proposal'
  | 'checklist'
  | 'guide'
  | 'library'
  | 'support';

/** Las demos de video son locales (FeatureVideoDemo). No se usan URLs externas. */
export const FEATURE_KEYS: FeatureKey[] = [
  'invoice',
  'quote',
  'calendar',
  'proposal',
  'checklist',
  'guide',
  'library',
  'support',
];
