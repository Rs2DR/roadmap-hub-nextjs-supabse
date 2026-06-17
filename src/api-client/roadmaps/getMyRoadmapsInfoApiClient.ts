import { http } from '@/lib/xior';

import type { Roadmap } from '@/shcemas/RoadmapSchema';

export const getMyRoadmapsInfoApiClient = async () => {
  const res = await http.get<Roadmap[]>(`/me/roadmaps`);

  return res.data;
};
