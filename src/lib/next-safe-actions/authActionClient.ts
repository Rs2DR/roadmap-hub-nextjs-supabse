import { actionClient } from '@/lib/next-safe-actions/actionClient';
import { createServerSupabase } from '@/lib/supabase/server';

export const authActionClient = actionClient.use(async ({ next }) => {
  const supabase = await createServerSupabase();

  const { data } = await supabase.auth.getClaims();

  if (!data) throw new Error('Пользователь не авторизован');

  return next({
    ctx: {
      userId: data.claims.sub,
      supabase,
    },
  });
});
