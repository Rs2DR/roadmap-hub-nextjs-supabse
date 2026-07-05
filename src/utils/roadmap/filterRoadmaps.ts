import type { RoadmapBase } from '@/schemas/roadmap/db/RoadmapBaseInfoDbSchema';

export const filterRoadmaps = <
  T extends Pick<RoadmapBase, 'title' | 'description'>,
>(
  roadmaps: T[],
  query: string,
): T[] => {
  const q = query.trim().toLowerCase();

  if (!q) return roadmaps;

  return roadmaps.filter((r) => {
    return (
      r.title.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q)
    );
  });
};
