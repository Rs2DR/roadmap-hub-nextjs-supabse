import { RoadmapEdgeSchema } from '@/shcemas/RoadmapEdgeSchema';
import { asObject } from '@/utils/asObject';

import type { RoadmapEdge } from '@/shcemas/RoadmapEdgeSchema';

export const formatEdges = (edges: unknown[] = []): RoadmapEdge[] => {
  if (!Array.isArray(edges)) return [];

  return edges.map((edge) => {
    const e = asObject(edge);

    return RoadmapEdgeSchema.parse({
      id: e.id,
      source: e.source,
      target: e.target,
      type: e.type,
      data: e.data,
    });
  });
};
