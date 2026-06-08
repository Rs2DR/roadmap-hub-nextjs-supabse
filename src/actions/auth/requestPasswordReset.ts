'use server';

import { createServerSupabase } from '@/lib/supabase/server';

import type { RequestResetPasswordInput } from '@/shcemas/requestResetPasswordSchema';

export const requestPasswordReset = async ({
  email,
}: RequestResetPasswordInput) => {
  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback/update-password`,
  });

  if (error) throw new Error(error.message);

  return { success: true };
};
