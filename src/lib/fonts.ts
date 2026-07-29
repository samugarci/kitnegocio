import { Figtree } from 'next/font/google';

/**
 * Una sola familia (ya usada en el proyecto) para títulos y cuerpo.
 * Evita descargas extra de Google Fonts que dejan la app colgada.
 */
export const body = Figtree({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

export const display = Figtree({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

export const syne = display;
export const figtree = body;
