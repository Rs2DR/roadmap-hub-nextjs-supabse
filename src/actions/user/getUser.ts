'use server';

import { createServerSupabase } from '@/lib/supabase/server';

export const getUser = async () => {
  const supabase = await createServerSupabase();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
};
