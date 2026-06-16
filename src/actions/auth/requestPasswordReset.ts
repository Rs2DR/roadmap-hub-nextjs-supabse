'use server';

import { API_ROUTES } from '@/constants/api';
import { actionClient } from '@/lib/next-safe-actions/actionClient';
import { createServerSupabase } from '@/lib/supabase/server';
import { RequestResetPasswordSchema } from '@/shcemas/RequestResetPasswordSchema';

export const requestPasswordReset = actionClient
  .inputSchema(RequestResetPasswordSchema)
  .action(async ({ parsedInput }) => {
    const supabase = await createServerSupabase();

    const { error } = await supabase.auth.resetPasswordForEmail(
      parsedInput.email,
      {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}${API_ROUTES.REQUEST_PASSWORD_RESET}`,
      },
    );

    if (error) throw new Error('Не удалось отправить письмо для сброса пароля');

    return { success: true };
  });
