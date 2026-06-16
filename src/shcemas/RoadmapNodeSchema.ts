import { z } from 'zod';

import { NodeDataSchema } from '@/shcemas/NodeDataSchema';

export const RoadmapNodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  data: NodeDataSchema,
});

export type RoadmapNode = z.infer<typeof RoadmapNodeSchema>;
