import type { SupabaseClient } from '@supabase/supabase-js';

import type { SignInInput } from '@/schemas/auth/SignInSchema';

export const signInWithEmailCore = async (
  supabase: SupabaseClient,
  params: SignInInput,
) => {
  const { email, password } = params;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error('Неверный email или пароль');
  }

  return { success: true };
};
