'use server';

import { createServerSupabase } from '@/lib/supabase/server';

import type { ResetPasswordInput } from '@/shcemas/resetPasswordSchema';

export const updatePassword = async ({ password }: ResetPasswordInput) => {
  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw new Error(error.message);

  return { success: true };
};
