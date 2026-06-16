import { actionClient } from '@/lib/next-safe-actions/actionClient';
import { createServerSupabase } from '@/lib/supabase/server';

export const authActionClient = actionClient.use(async ({ next }) => {
  const supabase = await createServerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error('Пользователь не авторизован');

  return next({
    ctx: {
      userId: session.user.id,
      supabase,
    },
  });
});
