import { NextResponse } from 'next/server';

import { APP_ROUTES, AUTH_ROUTES } from '@/constants/routes';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? APP_ROUTES.DASHBOARD;

  if (code) {
    const supabase = await createServerSupabase();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        `${origin}${AUTH_ROUTES.SIGN_IN}?error=invalid_code`,
      );
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
