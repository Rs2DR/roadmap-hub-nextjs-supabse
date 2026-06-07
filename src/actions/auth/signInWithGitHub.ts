'use server';

import { redirect } from 'next/navigation';

import { createServerSupabase } from '@/lib/supabase/server';

export const signInWithGitHub = async () => {
  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  });

  if (error) throw new Error(error.message);

  return redirect('/dashboard');
};

