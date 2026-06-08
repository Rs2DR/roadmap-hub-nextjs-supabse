'use server';

import { API_ROUTES } from '@/constants/api';
import { createServerSupabase } from '@/lib/supabase/server';

import type { RequestResetPasswordInput } from '@/shcemas/requestResetPasswordSchema';

export const requestPasswordReset = async ({
  email,
}: RequestResetPasswordInput) => {
  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}${API_ROUTES.REQUEST_PASSWORD_RESET}`,
  });

  if (error) throw new Error(error.message);

  return { success: true };
};
