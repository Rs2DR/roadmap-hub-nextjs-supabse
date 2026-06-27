import { z } from 'zod';

import { EdgeDataSchema } from '@/schemas/EdgeDataSchema';

export const RoadmapEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  type: z.string().optional(),
  data: EdgeDataSchema.optional(),
});

export type RoadmapEdge = z.infer<typeof RoadmapEdgeSchema>;
