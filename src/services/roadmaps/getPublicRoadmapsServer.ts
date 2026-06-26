import { getPublicRoadmapsCore } from '@/core/roadmaps';
import { requireAuth } from '@/lib/supabase';

import type { GetPublicRoadmapsInput } from '@/shcemas/GetPublicRoadmapsSchema';

export const getPublicRoadmapsServer = async (
  params: Omit<GetPublicRoadmapsInput, 'userId'>,
) => {
  const { search, orderBy } = params;
  const { supabase, userId } = await requireAuth();

  return getPublicRoadmapsCore(supabase, {
    search,
    orderBy,
    userId,
  });
};
