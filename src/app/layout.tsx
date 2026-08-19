import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KitNegocio',
  description: 'Packs y guías para Instagram y WhatsApp Business',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
