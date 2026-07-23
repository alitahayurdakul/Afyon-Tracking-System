import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { URL_PAGES } from './consts/url';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;


  const homePattern = new RegExp(`^/(?:(${routing.locales.join('|')}))?/?$`);
  const match = pathname.match(homePattern);
  if (match) {
    const locale = match[1];
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
