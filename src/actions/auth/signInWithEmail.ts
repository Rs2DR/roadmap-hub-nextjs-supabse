'use server';

import { signInWithEmailCore } from '@/core/auth';
import { actionClient } from '@/lib/next-safe-actions/actionClient';
import { createServerSupabase } from '@/lib/supabase/server';
import { SignInSchema } from '@/shcemas/SignInSchema';

export const signInWithEmail = actionClient
  .inputSchema(SignInSchema)
  .action(async ({ parsedInput }) => {
    const supabase = await createServerSupabase();

    const { email, password } = parsedInput;

    return signInWithEmailCore(supabase, {
      email,
      password,
    });
  });
