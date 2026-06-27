import { http } from '@/lib/xior';

import type { PublicRoadmap } from '@/schemas/PublicRoadmapSchema';
import type { GetPublicRoadmapsInput } from '@/schemas/roadmap/GetPublicRoadmapsSchema';

export const fetchPublicRoadmaps = async (
  params?: Omit<GetPublicRoadmapsInput, 'userId'>,
) => {
  const res = await http.get<PublicRoadmap[]>('/roadmaps', {
    params,
  });

  return res.data;
};
