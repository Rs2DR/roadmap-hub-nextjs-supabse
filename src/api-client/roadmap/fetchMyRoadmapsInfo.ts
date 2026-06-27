import { http } from '@/lib/xior';

import type { MyRoadmap } from '@/schemas/MyRoadmapSchema';

export const fetchMyRoadmapsInfo = async () => {
  const res = await http.get<MyRoadmap[]>(`/me/roadmaps`);

  return res.data;
};
