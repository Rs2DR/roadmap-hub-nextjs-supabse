import { getBookmarkedRoadmapsCore } from '@/core/roadmaps';
import { requireAuth } from '@/lib/supabase';

export const getBookmarkedRoadmaps = async () => {
  const { supabase, userId } = await requireAuth();

  return getBookmarkedRoadmapsCore(supabase, {
    userId,
  });
};
