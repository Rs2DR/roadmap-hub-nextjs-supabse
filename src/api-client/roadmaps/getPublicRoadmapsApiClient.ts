import { http } from '@/lib/xior';

import type { GetPublicRoadmapsInput } from '@/schemas/GetPublicRoadmapsSchema';
import type { PublicRoadmap } from '@/schemas/PublicRoadmapSchema';

export const getPublicRoadmapsApiClient = async (
  params?: Omit<GetPublicRoadmapsInput, 'userId'>,
) => {
  const res = await http.get<PublicRoadmap[]>('/roadmaps', {
    params,
  });

  return res.data;
};
