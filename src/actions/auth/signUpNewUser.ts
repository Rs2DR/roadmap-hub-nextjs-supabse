import { createServerSupabase } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const signUpNewUser = async (formData: FormData) => {
  'use server';

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const cookieStore = await cookies();
  const supabase = createServerSupabase(cookieStore);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName: name,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback?next=/dashboard`,
    },
  });

  if (error) throw new Error(error.message);

  return redirect('/confirm-email');
};

