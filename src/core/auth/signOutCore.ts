import type { SupabaseClient } from '@supabase/supabase-js';

export const signOutCore = async (supabase: SupabaseClient) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error('Не удалось выйти из аккаунта');
  }
};
