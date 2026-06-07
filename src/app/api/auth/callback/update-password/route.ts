import { NextResponse } from 'next/server';

import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const supabase = await createServerSupabase();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        `${origin}/reset-password?error=invalid_code`,
      );
    }
  }

  return NextResponse.redirect(new URL('/reset-password', request.url));
}
