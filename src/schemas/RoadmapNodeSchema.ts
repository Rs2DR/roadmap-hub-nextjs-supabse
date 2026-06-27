import { z } from 'zod';

import { NodeDataSchema } from '@/schemas/NodeDataSchema';

export const RoadmapNodeSchema = z.object({
  id: z.string(),
  type: z.string().optional(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  data: NodeDataSchema,
});

export type RoadmapNode = z.infer<typeof RoadmapNodeSchema>;
