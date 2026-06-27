import { z } from 'zod';

import { RoadmapEdgeSchema } from '@/schemas/roadmap/RoadmapEdgeSchema';
import { RoadmapNodeSchema } from '@/schemas/roadmap/RoadmapNodeSchema';
import { ViewportSchema } from '@/schemas/roadmap/ViewportSchema';

export const RoadmapGraphSchema = z.object({
  id: z.uuid(),
  viewport: ViewportSchema,
  created_at: z.string(),
  updated_at: z.string(),
  nodes: z.array(RoadmapNodeSchema).default([]),
  edges: z.array(RoadmapEdgeSchema).default([]),
});

export type RoadmapGraph = z.infer<typeof RoadmapGraphSchema>;
