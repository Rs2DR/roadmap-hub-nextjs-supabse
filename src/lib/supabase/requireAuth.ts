import { createServerSupabase } from '@/lib/supabase/server';

export async function requireAuth() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data) {
    throw new Error('Пользователь не авторизован');
  }

  return {
    supabase,
    userId: data.claims.sub,
  };
}
