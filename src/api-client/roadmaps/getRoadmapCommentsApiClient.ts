import { http } from '@/lib/xior';

import type { PublicComment } from '@/shcemas/PublicCommentSchema';

export const getRoadmapCommentsApiClient = async ({ id }: { id: string }) => {
  const res = await http.get<PublicComment[]>(`/roadmaps/${id}/comments`);

  return res.data;
};
