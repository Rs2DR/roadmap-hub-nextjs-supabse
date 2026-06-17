import { http } from '@/lib/xior';

import type { RoadmapGraph } from '@/shcemas/RoadmapGrahpSchema';

export const getRoadmapForViewApiClient = async ({ id }: { id: string }) => {
  const res = await http.get<RoadmapGraph>(`/roadmaps/${id}/view`);

  return res.data;
};
