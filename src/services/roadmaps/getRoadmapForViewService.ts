import { http } from '@/lib/xior';

import type { RoadmapGraph } from '@/shcemas/RoadmapGrahpSchema';

export const getRoadmapForViewService = async ({ id }: { id: string }) => {
  const res = await http.get<RoadmapGraph>(`/roadmap/${id}/view`);

  return res.data;
};
