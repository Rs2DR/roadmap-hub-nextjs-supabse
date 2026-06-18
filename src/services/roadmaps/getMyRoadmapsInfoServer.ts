import { getMyRoadmapsInfoCore } from '@/core/roadmaps';
import { createServerSupabase } from '@/lib/supabase/server';

export const getMyRoadmapsInfoServer = async () => {
  const supabase = await createServerSupabase();

  const { data } = await supabase.auth.getClaims();

  if (!data) return null;

  const {
    claims: { sub: userId },
  } = data;

  return getMyRoadmapsInfoCore(supabase, {
    userId,
  });
};
