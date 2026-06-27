import { getRoadmapForEditCore } from '@/core/roadmaps';
import { requireAuth } from '@/lib/supabase';

export const getRoadmapForEdit = async (params: { id: string }) => {
  const { supabase } = await requireAuth();

  return getRoadmapForEditCore(supabase, params);
};
