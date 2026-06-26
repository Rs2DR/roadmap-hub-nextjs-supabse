import { RoadmapGraphSchema } from '@/shcemas/RoadmapGrahpSchema';

import type { z } from 'zod';

export const SaveRoadmapGraphSchema = RoadmapGraphSchema.omit({
  created_at: true,
  updated_at: true,
});

export type SaveRoadmapGraphInput = z.infer<typeof SaveRoadmapGraphSchema>;
