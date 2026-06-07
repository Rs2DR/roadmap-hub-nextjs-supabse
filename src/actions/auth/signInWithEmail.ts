'use server';

import { createServerSupabase } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const signInWithEmail = async (formData: FormData) => {
  'use server';
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const cookieStore = await cookies();
  const supabase = createServerSupabase(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return redirect('/dashboard');
};

