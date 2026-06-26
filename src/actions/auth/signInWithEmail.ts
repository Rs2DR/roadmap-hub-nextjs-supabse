'use server';

import { signInWithEmailCore } from '@/core/auth';
import { actionClient } from '@/lib/next-safe-actions';
import { createServerSupabase } from '@/lib/supabase';
import { SignInSchema } from '@/schemas/signInSchema';

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
