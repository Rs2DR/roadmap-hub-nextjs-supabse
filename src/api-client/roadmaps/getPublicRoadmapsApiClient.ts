import { http } from '@/lib/xior';

import type { GetPublicRoadmapsInput } from '@/shcemas/GetPublicRoadmapsSchema';
import type { PublicRoadmap } from '@/shcemas/PublicRoadmapSchema';

export const getPublicRoadmapsApiClient = async (
  params?: Omit<GetPublicRoadmapsInput, 'userId'>,
) => {
  const res = await http.get<PublicRoadmap[]>('/roadmaps', {
    params,
  });

  return res.data;
};
