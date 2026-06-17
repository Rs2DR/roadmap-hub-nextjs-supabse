'use server';

import { signOutCore } from '@/core/auth';
import { actionClient } from '@/lib/next-safe-actions/actionClient';
import { createServerSupabase } from '@/lib/supabase/server';

export const signOut = actionClient.action(async () => {
  const supabase = await createServerSupabase();

  return signOutCore(supabase);
});
