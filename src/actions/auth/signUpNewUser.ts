'use server';

import { API_ROUTES } from '@/constants/api';
import { createServerSupabase } from '@/lib/supabase/server';

import type { SignUpInput } from '@/shcemas/SignUpSchema';

export const signUpNewUser = async ({ name, email, password }: SignUpInput) => {
  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName: name,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}${API_ROUTES.CONFIRM_PASSWORD}?next=/dashboard`,
    },
  });

  if (error) throw new Error(error.message);

  return { success: true };
};
