import { Figtree, Syne } from 'next/font/google';

/** Cuerpo legible, técnico y limpio */
export const body = Figtree({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

/** Display expresivo para marca y titulares */
export const display = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
  preload: true,
  fallback: ['Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

export const syne = display;
export const figtree = body;
