import { z } from 'zod';

import { ROADMAP_TYPES } from '@/constants/roadmap';
import { UuidSchema } from '@/schemas/common';
import { EdgeDataDbSchema } from '@/schemas/roadmap/db';

export const RoadmapEdgeDbSchema = z.object({
  id: UuidSchema,
  source: z.string(),
  target: z.string(),
  type: z.literal(ROADMAP_TYPES.edge).default(ROADMAP_TYPES.edge),
  data: EdgeDataDbSchema.optional(),
});

export type RoadmapEdgeDb = z.infer<typeof RoadmapEdgeDbSchema>;
