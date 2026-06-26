import { getBookmarkedRoadmapsCore } from '@/core/roadmaps';
import { requireAuth } from '@/lib/supabase';

export const getBookmarkedRoadmapsServer = async () => {
  const { supabase, userId } = await requireAuth();

  return getBookmarkedRoadmapsCore(supabase, {
    userId,
  });
};
