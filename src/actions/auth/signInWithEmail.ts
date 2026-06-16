'use server';

import { actionClient } from '@/lib/next-safe-actions/actionClient';
import { createServerSupabase } from '@/lib/supabase/server';
import { SignInSchema } from '@/shcemas/SignInSchema';

export const signInWithEmail = actionClient
  .inputSchema(SignInSchema)
  .action(async ({ parsedInput }) => {
    const supabase = await createServerSupabase();

    const { error } = await supabase.auth.signInWithPassword({
      email: parsedInput.email,
      password: parsedInput.password,
    });

    if (error) throw new Error('Неверный email или пароль');

    return { success: true };
  });
