import { http } from '@/lib/xior';

import type { RoadmapGraph } from '@/shcemas/RoadmapGrahpSchema';

export const getRoadmapForEditService = async ({ id }: { id: string }) => {
  const res = await http.get<RoadmapGraph>(`/roadmap/${id}/edit`);

  return res.data;
};
