import { actionClient } from '@/lib/next-safe-actions/actionClient';
import { requireAuth } from '@/lib/supabase/requireAuth';

export const authActionClient = actionClient.use(async ({ next }) => {
  const { userId, supabase } = await requireAuth();

  return next({
    ctx: {
      userId,
      supabase,
    },
  });
});
