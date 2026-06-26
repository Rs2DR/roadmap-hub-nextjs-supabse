import { z } from 'zod';

import { RoadmapEdgeSchema } from '@/shcemas/RoadmapEdgeSchema';
import { RoadmapNodeSchema } from '@/shcemas/RoadmapNodeSchema';
import { ViewportSchema } from '@/shcemas/ViewportSchema';

export const RoadmapGraphSchema = z.object({
  id: z.uuid(),
  viewport: ViewportSchema,
  created_at: z.string(),
  updated_at: z.string(),
  nodes: z.array(RoadmapNodeSchema).default([]),
  edges: z.array(RoadmapEdgeSchema).default([]),
});

export type RoadmapGraph = z.infer<typeof RoadmapGraphSchema>;
