'use server';

import { createServerSupabase } from '@/lib/supabase/server';

export const signOut = async () => {
  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

  return { success: true };
};
