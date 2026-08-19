/** Assets locales en /public/images — ilustraciones de marca, sin dependencias externas */
const img = (file: string) => `/images/${file}`;

export const IMAGES = {
  hero: img('hero.svg'),
  invoice: img('feed.svg'),
  calendar: img('reels.svg'),
  proposal: img('whatsapp.svg'),

  creatorPhone: img('hero.svg'),
  studioDesk: img('feed.svg'),
  reelsShoot: img('reels.svg'),
  whatsappChat: img('whatsapp.svg'),
  boutiqueOwner: img('feed.svg'),
  cafeOwner: img('reels.svg'),
  beautyPro: img('whatsapp.svg'),
  agencyContrast: img('hero.svg'),
  diyChaos: img('feed.svg'),
  kitClarity: img('reels.svg'),

  workspace: img('feed.svg'),
  enroll: img('hero.svg'),
  members: img('whatsapp.svg'),
  support: img('reels.svg'),
} as const;
