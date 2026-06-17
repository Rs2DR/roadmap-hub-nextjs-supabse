import type { SupabaseClient } from '@supabase/supabase-js';

import type { SignUpInput } from '@/shcemas/SignUpSchema';

export const signUpCore = async (
  supabase: SupabaseClient,
  params: Omit<SignUpInput, 'confirmPassword'> & { emailRedirectTo: string },
) => {
  const { email, password, name, emailRedirectTo } = params;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName: name,
      },
      emailRedirectTo,
    },
  });

  if (error) {
    throw new Error('Не удалось создать аккаунт');
  }

  return { success: true };
};
