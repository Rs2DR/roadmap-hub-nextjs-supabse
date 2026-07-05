import { RoadmapGraphBaseSchema } from '@/schemas/roadmap';

import type { z } from 'zod';

export const RoadmapGraphInputSchema = RoadmapGraphBaseSchema.omit({
  created_at: true,
  updated_at: true,
});

export type RoadmapGraphInput = z.infer<typeof RoadmapGraphInputSchema>;
