import { getMyRoadmapsInfoCore } from '@/core/roadmaps';
import { requireAuth } from '@/lib/supabase';

export const getMyRoadmapsInfo = async () => {
  const { supabase, userId } = await requireAuth();

  return getMyRoadmapsInfoCore(supabase, {
    userId,
  });
};
