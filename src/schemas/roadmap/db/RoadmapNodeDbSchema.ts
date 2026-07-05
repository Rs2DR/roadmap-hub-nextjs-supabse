import { z } from 'zod';

import { ROADMAP_TYPES } from '@/constants/roadmap';
import { PositionSchema, UuidSchema } from '@/schemas/common';
import { NodeDataDbSchema } from '@/schemas/roadmap/db';

export const RoadmapNodeDbSchema = z.object({
  id: UuidSchema,
  type: z.literal(ROADMAP_TYPES.node).default(ROADMAP_TYPES.node),
  position: PositionSchema,
  data: NodeDataDbSchema,
});

export type RoadmapNodeDb = z.infer<typeof RoadmapNodeDbSchema>;
