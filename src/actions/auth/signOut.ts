'use server';

import { signOutCore } from '@/core/auth';
import { actionClient } from '@/lib/next-safe-actions';
import { createServerSupabase } from '@/lib/supabase';

export const signOut = actionClient.action(async () => {
  const supabase = await createServerSupabase();

  return signOutCore(supabase);
});
