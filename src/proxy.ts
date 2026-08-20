import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { isPublicPath, SESSION_COOKIE_NAME, URL_PAGES } from './consts/url';
import { routing } from './i18n/routing';
import { stripLocale } from './utils/stripLocale';

const intlMiddleware = createMiddleware(routing);

/** Returns the locale prefix of a pathname, or null when there is none. */
const localeOf = (pathname: string): string | null => {
  const segment = pathname.split('/')[1];
  return (routing.locales as readonly string[]).includes(segment)
    ? segment
    : null;
};

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = localeOf(pathname);

  // Session gate. This checks that a session cookie exists, NOT that it is
  // valid — the frontend cannot verify the signature, so the backend stays the
  // authority. Its value is that protected pages are never served to an
  // anonymous request, and that this holds with JavaScript disabled.
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE_NAME)?.value);
  if (!hasSession && !isPublicPath(stripLocale(pathname))) {
    const url = request.nextUrl.clone();
    url.pathname = locale ? `/${locale}${URL_PAGES.login}` : URL_PAGES.login;
    url.search = '';
    return NextResponse.redirect(url);
  }

  // Deliberately no reverse redirect (cookie present -> skip /login): the
  // cookie may be expired, and AuthBootstrap would send the user straight back
  // to /login, producing a loop. Only the client knows whether a refresh
  // actually succeeded, so that decision stays there.

  const homePattern = new RegExp(`^/(?:(${routing.locales.join('|')}))?/?$`);
  const match = pathname.match(homePattern);
  if (match) {
    const url = request.nextUrl.clone();
    url.pathname = locale
      ? `/${locale}${URL_PAGES.activeProcesses}`
      : URL_PAGES.activeProcesses;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|asset-proxy|.*\\..*).*)']
};
