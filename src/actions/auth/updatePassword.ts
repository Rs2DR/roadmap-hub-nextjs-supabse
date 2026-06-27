'use server';

import { updatePasswordCore } from '@/core/auth';
import { actionClient } from '@/lib/next-safe-actions';
import { createServerSupabase } from '@/lib/supabase';
import { ResetPasswordSchema } from '@/schemas/auth/ResetPasswordSchema';

export const updatePassword = actionClient
  .inputSchema(ResetPasswordSchema)
  .action(async ({ parsedInput }) => {
    const supabase = await createServerSupabase();

    const { password } = parsedInput;

    return updatePasswordCore(supabase, {
      password,
    });
  });
