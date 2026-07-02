'use server';

import { updatePasswordCore } from '@/core/auth';
import { actionClient } from '@/lib/next-safe-actions';
import { createServerSupabase } from '@/lib/supabase';
import { PasswordWithConfirmSchema } from '@/schemas/auth';

export const updatePassword = actionClient
  .inputSchema(PasswordWithConfirmSchema)
  .action(async ({ parsedInput }) => {
    const supabase = await createServerSupabase();

    const { password } = parsedInput;

    return updatePasswordCore(supabase, {
      password,
    });
  });
