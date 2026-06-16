'use server';

import { actionClient } from '@/lib/next-safe-actions/actionClient';
import { createServerSupabase } from '@/lib/supabase/server';

export const getUser = actionClient.action(async () => {
  const supabase = await createServerSupabase();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error('Не удалось получить пользователя');

  return user;
});
