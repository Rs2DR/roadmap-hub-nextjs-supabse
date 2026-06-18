import type { MyRoadmap } from '@/shcemas/MyRoadmapSchema';

export const filterRoadmaps = (roadmaps: MyRoadmap[], query: string) => {
  const q = query.trim().toLowerCase();

  if (!q) return roadmaps;

  return roadmaps.filter((r) => {
    return (
      r.title.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q)
    );
  });
};
