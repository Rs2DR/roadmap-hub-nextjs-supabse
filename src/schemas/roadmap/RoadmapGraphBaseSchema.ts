import z from 'zod';

import { RoadmapEdgeSchema, RoadmapNodeSchema } from '@/schemas/roadmap';
import { RoadmapGraphBaseDbSchema } from '@/schemas/roadmap/db';

export const RoadmapGraphBaseSchema = RoadmapGraphBaseDbSchema.omit({
  nodes: true,
  edges: true,
}).extend({
  nodes: z.array(RoadmapNodeSchema).default([]),
  edges: z.array(RoadmapEdgeSchema).default([]),
});

export type RoadmapGraphBase = z.infer<typeof RoadmapGraphBaseSchema>;
