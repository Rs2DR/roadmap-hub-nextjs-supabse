import { RoadmapNodeSchema } from '@/shcemas/RoadmapNodeSchema';
import { asObject } from '@/utils/asObject';

import type { RoadmapNode } from '@/shcemas/RoadmapNodeSchema';

export const formatNodes = (nodes: unknown[] = []): RoadmapNode[] => {
  if (!Array.isArray(nodes)) return [];

  return nodes.map((node) => {
    const n = asObject(node);

    return RoadmapNodeSchema.parse({
      id: n.id,
      type: n.type,
      position: {
        x: Number(n.position_x),
        y: Number(n.position_y),
      },
      data: n.data,
    });
  });
};
