import type { SupabaseClient } from '@supabase/supabase-js';

import type { PasswordWithConfirmInput } from '@/schemas/auth';

export const updatePasswordCore = async (
  supabase: SupabaseClient,
  params: Omit<PasswordWithConfirmInput, 'confirmPassword'>,
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
