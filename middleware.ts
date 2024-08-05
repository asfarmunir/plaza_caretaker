import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLoggedIn = req.cookies.get('isLoggedIn');

  if (!isLoggedIn && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isLoggedIn && pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url)); // Change '/' to '/dashboard' or another page as needed
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
  ],
};
