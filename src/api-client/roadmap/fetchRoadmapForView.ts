import { http } from '@/lib/xior';

import type { PublicRoadmapGraph } from '@/schemas/roadmap/PublicRoadmapGraphSchema';

export const fetchRoadmapForView = async ({ id }: { id: string }) => {
  const res = await http.get<PublicRoadmapGraph>(`/roadmaps/${id}/view`);

  return res.data;
};
