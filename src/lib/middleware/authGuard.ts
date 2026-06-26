import { NextResponse } from 'next/server';

import {
  AUTH_PROTECTED_ROUTES,
  APP_PROTECTED_ROUTES,
  AUTH_ROUTES,
  APP_ROUTES,
} from '@/constants/routes';

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

    const isAuthPage = AUTH_PROTECTED_ROUTES.some((path) =>
      pathname.startsWith(path),
    );
    const isProtectedPage = APP_PROTECTED_ROUTES.some((path) =>
      pathname.startsWith(path),
    );

    if (!user && isProtectedPage) {
      const url = request.nextUrl.clone();
      url.pathname = AUTH_ROUTES.SIGN_IN;
      return NextResponse.redirect(url);
    }

    if (user && isAuthPage) {
      const url = request.nextUrl.clone();
      url.pathname = APP_ROUTES.DASHBOARD;
      return NextResponse.redirect(url);
    }

    return next(request, event);
  };
};
