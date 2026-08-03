import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n/config';
import { verifySessionTokenEdge } from './lib/session-edge';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

const SESSION_COOKIE = 'kitnegocio_session';

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/packs/')) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const session = token ? await verifySessionTokenEdge(token) : null;
    if (!session || !['demo_active', 'active', 'trialing'].includes(session.status)) {
      return NextResponse.json(
        { error: 'Debes iniciar sesión para descargar' },
        { status: 401 }
      );
    }
  }

  const adminMatch = pathname.match(/^\/(es|en)\/admin\/?$/);
  if (adminMatch) {
    const locale = adminMatch[1];
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const session = token ? await verifySessionTokenEdge(token) : null;

    if (!session || session.role !== 'super_admin') {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/miembros`;
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(es|en)/:path*', '/packs/:path*'],
};
