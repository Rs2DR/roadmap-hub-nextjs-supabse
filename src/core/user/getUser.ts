import type { SupabaseClient } from '@supabase/supabase-js';

export const getUserCore = async (supabase: SupabaseClient) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error('Не удалось получить пользователя');
  }

  return user;
};
