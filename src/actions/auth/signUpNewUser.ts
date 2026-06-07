'use server';

import { redirect } from 'next/navigation';

import { createServerSupabase } from '@/lib/supabase/server';

import type { SignUpInput } from '@/shcemas/signUpSchema';

export const signUpNewUser = async ({ name, email, password }: SignUpInput) => {
  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName: name,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback?next=/dashboard`,
    },
  });

  if (error) throw new Error(error.message);

  return redirect('/confirm-email');
};

