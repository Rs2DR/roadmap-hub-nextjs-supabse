import z from 'zod';

import { RoadmapEdgeSchema } from '@/shcemas/RoadmapEdgeSchema';
import { RoadmapNodeSchema } from '@/shcemas/RoadmapNodeSchema';
import { ViewportSchema } from '@/shcemas/ViewportSchema';

export const RoadmapGraphBaseSchema = z.object({
  id: z.uuid(),
  viewport: ViewportSchema,
  is_public: z.boolean(),
  user_id: z.uuid(),
  created_at: z.string(),
  updated_at: z.string(),
  nodes: z.array(RoadmapNodeSchema).default([]),
  edges: z.array(RoadmapEdgeSchema).default([]),
});
