import { getRoadmapForViewCore } from '@/core/roadmaps';
import { requireAuth } from '@/lib/supabase';

export const getRoadmapForViewServer = async (params: { id: string }) => {
  const { id } = params;
  const { supabase, userId } = await requireAuth();

  return getRoadmapForViewCore(supabase, { id, userId });
};
