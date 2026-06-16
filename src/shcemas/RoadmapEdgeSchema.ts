import { z } from 'zod';

import { EdgeDataSchema } from '@/shcemas/EdgeDataSchema';

export const RoadmapEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  type: z.string(),
  data: EdgeDataSchema.optional(),
});

export type RoadmapEdge = z.infer<typeof RoadmapEdgeSchema>;
