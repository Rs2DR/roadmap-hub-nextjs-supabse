'use server';

import { API_ROUTES } from '@/constants/api';
import { actionClient } from '@/lib/next-safe-actions/actionClient';
import { createServerSupabase } from '@/lib/supabase/server';
import { SignUpSchema } from '@/shcemas/SignUpSchema';

export const signUpNewUser = actionClient
  .inputSchema(SignUpSchema)
  .action(async ({ parsedInput }) => {
    const supabase = await createServerSupabase();

    const { error } = await supabase.auth.signUp({
      email: parsedInput.email,
      password: parsedInput.password,
      options: {
        data: {
          firstName: parsedInput.name,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}${API_ROUTES.CONFIRM_PASSWORD}?next=/dashboard`,
      },
    });

    if (error) throw new Error('Не удалось создать аккаунт');

    return { success: true };
  });
