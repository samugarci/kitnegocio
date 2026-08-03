import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0E7490',
          dark: '#0B5F75',
          light: '#ECFEFF',
          muted: '#A5F3FC',
        },
        accent: {
          DEFAULT: '#F0592A',
          dark: '#D9481F',
          light: '#FFF1EB',
        },
        ink: {
          DEFAULT: '#0B1220',
          soft: '#334155',
          faint: '#64748B',
        },
        paper: {
          DEFAULT: '#F8FAFC',
          warm: '#F1F5F9',
        },
        text: {
          DEFAULT: '#0B1220',
          muted: '#334155',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        sans: ['var(--font-body)', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        'pulse-soft': 'pulseSoft 2.8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
      },
      backgroundImage: {
        'mesh-legal':
          'radial-gradient(ellipse 80% 60% at 8% 15%, rgba(14,116,144,0.14), transparent), radial-gradient(ellipse 55% 45% at 92% 8%, rgba(240,89,42,0.12), transparent), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(14,116,144,0.08), transparent)',
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
