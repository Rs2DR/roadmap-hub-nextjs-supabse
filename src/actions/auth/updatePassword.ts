'use server';

import { updatePasswordCore } from '@/core/auth';
import { actionClient } from '@/lib/next-safe-actions/actionClient';
import { createServerSupabase } from '@/lib/supabase/server';
import { ResetPasswordSchema } from '@/shcemas/ResetPasswordSchema';

export const updatePassword = actionClient
  .inputSchema(ResetPasswordSchema)
  .action(async ({ parsedInput }) => {
    const supabase = await createServerSupabase();

    const { password } = parsedInput;

    return updatePasswordCore(supabase, {
      password,
    });
  });
