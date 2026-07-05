import { RoadmapCommentDbSchema } from '@/schemas/roadmap/db';

import type z from 'zod';

export const RoadmapCommentSchema = RoadmapCommentDbSchema.transform(
  ({ created_at, first_name, user_id, roadmap_id, ...rest }) => ({
    roadmapId: roadmap_id,
    userId: user_id,
    createdAt: created_at,
    firstName: first_name,
    ...rest,
  }),
);

export type RoadmapComment = z.infer<typeof RoadmapCommentSchema>;
