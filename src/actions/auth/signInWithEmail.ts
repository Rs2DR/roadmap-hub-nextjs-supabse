'use server';

import { createServerSupabase } from '@/lib/supabase/server';

import type { SignInInput } from '@/shcemas/SignInSchema';

export const signInWithEmail = async ({ email, password }: SignInInput) => {
  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return { success: true };
};
