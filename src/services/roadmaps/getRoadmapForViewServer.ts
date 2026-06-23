import { getRoadmapForViewCore } from '@/core/roadmaps';
import { requireAuth } from '@/lib/supabase';

export const getRoadmapForViewServer = async (params: { id: string }) => {
  const { supabase } = await requireAuth();

  return getRoadmapForViewCore(supabase, params);
};
