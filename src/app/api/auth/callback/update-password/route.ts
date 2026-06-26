import { NextResponse } from 'next/server';

import { AUTH_ROUTES } from '@/constants/routes';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const supabase = await createServerSupabase();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        `${origin}${AUTH_ROUTES.RESET_PASSWORD}?error=invalid_code`,
      );
    }
  }

  return NextResponse.redirect(
    new URL(AUTH_ROUTES.UPDATE_PASSWORD, request.url),
  );
}
