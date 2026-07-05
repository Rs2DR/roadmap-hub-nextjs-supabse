import { z } from 'zod';

import { ROADMAP_TYPES } from '@/constants/roadmap';
import { UuidSchema } from '@/schemas/common';
import { EdgeDataDbSchema } from '@/schemas/roadmap/db';

export const RoadmapEdgeDbSchema = z.object({
  id: UuidSchema,
  source: z.string('Некорректное значение source'),
  target: z.string('Некоррктное значение traget'),
  type: z.literal(ROADMAP_TYPES.edge).default(ROADMAP_TYPES.edge),
  data: EdgeDataDbSchema.optional(),
});

export type RoadmapEdgeDb = z.infer<typeof RoadmapEdgeDbSchema>;
