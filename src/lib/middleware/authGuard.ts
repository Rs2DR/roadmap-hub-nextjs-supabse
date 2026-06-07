import { NextResponse } from 'next/server';

import { createServerSupabase } from '../supabase/server';

import type { NextFetchEvent, NextRequest } from 'next/server';

import type { MiddlewareFactory } from './chain';

export const withAuthGuard: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    const supabase = await createServerSupabase();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const isAuthPage =
      pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
    const isProtectedPage = pathname.startsWith('/dashboard');

    if (!user && isProtectedPage) {
      const url = request.nextUrl.clone();
      url.pathname = '/sign-in';
      return NextResponse.redirect(url);
    }

    if (user && isAuthPage) {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }

    return next(request, event);
  };
};
