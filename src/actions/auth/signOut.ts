'use server';

import { actionClient } from '@/lib/next-safe-actions/actionClient';
import { createServerSupabase } from '@/lib/supabase/server';

export const signOut = actionClient.action(async () => {
  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.signOut();

  if (error) throw new Error('Не удалось выйти из аккаунта');

  return { success: true };
});
