import { getRoadmapCommentsCore } from '@/core/roadmaps/getRoadmapCommentsCore';
import { requireAuth } from '@/lib/supabase';

export const getRoadmapComments = async (params: { roadmapId: string }) => {
  const { supabase } = await requireAuth();

  return getRoadmapCommentsCore(supabase, params);
};
