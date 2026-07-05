import { z } from 'zod';

import { TimestampSchema, UuidSchema, ViewportSchema } from '@/schemas/common';
import { RoadmapEdgeDbSchema, RoadmapNodeDbSchema } from '@/schemas/roadmap/db';

export const RoadmapGraphBaseDbSchema = z.object({
  id: UuidSchema,
  viewport: ViewportSchema,
  created_at: TimestampSchema,
  updated_at: TimestampSchema,
  nodes: z.array(RoadmapNodeDbSchema).default([]),
  edges: z.array(RoadmapEdgeDbSchema).default([]),
});

export type RoadmapGraphBaseDb = z.infer<typeof RoadmapGraphBaseDbSchema>;
