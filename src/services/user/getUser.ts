import { getUserCore } from '@/core/user';
import { createServerSupabase } from '@/lib/supabase/server';

export const getUser = async () => {
  const supabase = await createServerSupabase();

  return getUserCore(supabase);
};
