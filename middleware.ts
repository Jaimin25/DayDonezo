import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from 'next-firebase-auth-edge';
import { clientConfig, serverConfig } from './lib/config';
import { isUserAuth } from './lib/auth';

const AUTH_PROTECTED_ROUTES = [
  '/dashboard',
  '/settings',
  '/analytics',
  '/leaderboard',
  '/journal',
  '/journal/new',
];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;
  const isAuth = await isUserAuth();

  if (path.startsWith('/leaderboard')) {
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  // Redirect to dashboard if logged in and accessing login/register routes
  if (['/login', '/register'].includes(path) && isAuth) {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // Redirect to login if accessing any protected route without authentication
  if (
    AUTH_PROTECTED_ROUTES.some((route) => path.startsWith(route)) &&
    !isAuth
  ) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Redirect root to dashboard if authenticated
  if (path === '/' && isAuth) {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // Default authentication middleware
  return authMiddleware(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
  });
}

export const config = {
  matcher: [
    '/', // Root route
    '/((?!_next|api|.*\\.).*)', // Exclude _next, API, and static files
    '/api/(login|logout)', // Login/logout API routes
    '/(login|register)', // Login and register routes
    '/dashboard', // Dashboard route
    '/journal/:path*', // Journal and its subpaths
    '/settings', // Settings page
    '/analytics', // Analytics page
  ],
};
