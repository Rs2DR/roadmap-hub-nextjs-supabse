import { http } from '@/lib/xior';

import type { PublicRoadmapGraph } from '@/shcemas/PublicRoadmapGraphSchema';

export const getRoadmapForViewApiClient = async ({ id }: { id: string }) => {
  const res = await http.get<PublicRoadmapGraph>(`/roadmaps/${id}/view`);

  return res.data;
};
