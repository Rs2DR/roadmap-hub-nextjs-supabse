import type { SupabaseClient } from '@supabase/supabase-js';

import type { ResetPasswordInput } from '@/schemas/auth/ResetPasswordSchema';

export const updatePasswordCore = async (
  supabase: SupabaseClient,
  params: Omit<ResetPasswordInput, 'confirmPassword'>,
) => {
  const { password } = params;

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    throw new Error('Не удалось обновить пароль');
  }

  return { success: true };
};
