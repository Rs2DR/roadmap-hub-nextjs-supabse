import { http } from '@/lib/xior';

import type { MyRoadmap } from '@/shcemas/MyRoadmapSchema';

export const getMyRoadmapsInfoApiClient = async () => {
  const res = await http.get<MyRoadmap[]>(`/me/roadmaps`);

  return res.data;
};
