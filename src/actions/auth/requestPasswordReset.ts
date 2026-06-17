'use server';

import { API_ROUTES } from '@/constants/api';
import { requestPasswordResetCore } from '@/core/auth';
import { actionClient } from '@/lib/next-safe-actions/actionClient';
import { createServerSupabase } from '@/lib/supabase/server';
import { RequestResetPasswordSchema } from '@/shcemas/RequestResetPasswordSchema';

export const requestPasswordReset = actionClient
  .inputSchema(RequestResetPasswordSchema)
  .action(async ({ parsedInput }) => {
    const supabase = await createServerSupabase();

    const { email } = parsedInput;
    const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL}${API_ROUTES.REQUEST_PASSWORD_RESET}`;

    return requestPasswordResetCore(supabase, {
      email,
      redirectTo,
    });
  });
