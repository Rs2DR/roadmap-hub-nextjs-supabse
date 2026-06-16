import z from 'zod';

import { RoadmapBaseSchema } from '@/shcemas/RoadmapBaseSchema';
import { RoadmapEdgeSchema } from '@/shcemas/RoadmapEdgeSchema';
import { RoadmapNodeSchema } from '@/shcemas/RoadmapNodeSchema';
import { ViewportSchema } from '@/shcemas/ViewportSchema';

export const RoadmapGraphBaseSchema = z.object({
  id: RoadmapBaseSchema.shape.id,
  viewport: ViewportSchema,
  is_public: RoadmapBaseSchema.shape.is_public,
  user_id: z.uuid(),
  created_at: RoadmapBaseSchema.shape.created_at,
  updated_at: RoadmapBaseSchema.shape.updated_at,
  nodes: z.array(RoadmapNodeSchema).default([]),
  edges: z.array(RoadmapEdgeSchema).default([]),
});
