import { http } from '@/lib/xior';

import type { PublicRoadmap } from '@/shcemas/PublicRoadmapSchema';

export const getBookmarkedRoadmapsApiClient = async () => {
  const res = await http.get<PublicRoadmap[]>(`/me/roadmaps/bookmarks`);

  return res.data;
};
