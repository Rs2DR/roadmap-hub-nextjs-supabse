'use server';

import { redirect } from 'next/navigation';

import { createServerSupabase } from '@/lib/supabase/server';

export const signOut = async () => {
  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

  return redirect('/');
};
