'use server';

import { API_ROUTES } from '@/constants/api';
import { signUpCore } from '@/core/auth';
import { actionClient } from '@/lib/next-safe-actions';
import { createServerSupabase } from '@/lib/supabase';
import { SignUpSchema } from '@/schemas/auth/SignUpSchema';

export const signUpNewUser = actionClient
  .inputSchema(SignUpSchema)
  .action(async ({ parsedInput }) => {
    const supabase = await createServerSupabase();

    const { email, password, name } = parsedInput;
    const emailRedirectTo = `${process.env.NEXT_PUBLIC_SITE_URL}${API_ROUTES.CONFIRM_PASSWORD}?next=/dashboard`;

    return signUpCore(supabase, {
      email,
      password,
      name,
      emailRedirectTo,
    });
  });
