'use server';

import { actionClient } from '@/lib/next-safe-actions/actionClient';
import { createServerSupabase } from '@/lib/supabase/server';
import { ResetPasswordSchema } from '@/shcemas/ResetPasswordSchema';

export const updatePassword = actionClient
  .inputSchema(ResetPasswordSchema)
  .action(async ({ parsedInput }) => {
    const supabase = await createServerSupabase();

    const { error } = await supabase.auth.updateUser({
      password: parsedInput.password,
    });

    if (error) throw new Error('Не удалось обновить пароль');

    return { success: true };
  });
