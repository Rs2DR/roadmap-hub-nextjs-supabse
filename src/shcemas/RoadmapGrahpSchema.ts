import { RoadmapGraphBaseSchema } from '@/shcemas/RoadmapGraphBaseSchema';

import type { z } from 'zod';

export const RoadmapGraphSchema = RoadmapGraphBaseSchema.transform((data) => ({
  id: data.id,
  viewport: data.viewport,
  isPublic: data.is_public,
  userId: data.user_id,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
  nodes: data.nodes,
  edges: data.edges,
}));

export type RoadmapGraph = z.infer<typeof RoadmapGraphSchema>;
