import type { SupabaseClient } from '@supabase/supabase-js';

import type { RequestResetPasswordInput } from '@/schemas/auth/RequestResetPasswordSchema';

export const requestPasswordResetCore = async (
  supabase: SupabaseClient,
  params: RequestResetPasswordInput & { redirectTo: string },
) => {
  const { email, redirectTo } = params;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  if (error) {
    throw new Error('Не удалось отправить письмо для сброса пароля');
  }

  return { success: true };
};
