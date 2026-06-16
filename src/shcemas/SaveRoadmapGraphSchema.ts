import { RoadmapGraphBaseSchema } from '@/shcemas/RoadmapGraphBaseSchema';

import type z from 'zod';

export const SaveRoadmapGraphSchema = RoadmapGraphBaseSchema.omit({
  user_id: true,
  created_at: true,
  updated_at: true,
  is_public: true,
});

export type SaveRoadmapGraphInput = z.infer<typeof SaveRoadmapGraphSchema>;
