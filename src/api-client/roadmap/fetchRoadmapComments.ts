import { http } from '@/lib/xior';

import type { PublicComment } from '@/schemas/roadmap/PublicCommentSchema';

export const fetchRoadmapComments = async ({ id }: { id: string }) => {
  const res = await http.get<PublicComment[]>(`/roadmaps/${id}/comments`);

  return res.data;
};
