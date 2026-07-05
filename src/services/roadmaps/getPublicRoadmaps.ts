import { getPublicRoadmapsCore } from '@/core/roadmaps';
import { requireAuth } from '@/lib/supabase';

import type { GetPublicRoadmapsInput } from '@/schemas/roadmap/form/PublicRoadmapsInputSchema';

export const getPublicRoadmaps = async (
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
