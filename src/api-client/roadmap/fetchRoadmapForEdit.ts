import { http } from '@/lib/xior';

import type { RoadmapGraph } from '@/schemas/roadmap/RoadmapGrahpSchema';

export const fetchRoadmapForEdit = async ({ id }: { id: string }) => {
  const res = await http.get<RoadmapGraph>(`/roadmaps/${id}/edit`);

  return res.data;
};
