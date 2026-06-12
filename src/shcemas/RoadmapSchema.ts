import { RoadmapBaseSchema } from './RoadmapBaseSchema';

import type z from 'zod';

export const RoadmapSchema = RoadmapBaseSchema.transform(
  ({
    roadmap_comments,
    roadmap_likes,
    is_public,
    created_at,
    updated_at,
    ...rest
  }) => ({
    ...rest,
    isPublic: is_public,
    createdAt: created_at,
    updatedAt: updated_at,
    likesCount: roadmap_likes[0].count,
    commentsCount: roadmap_comments[0].count,
  }),
);

export type Roadmap = z.infer<typeof RoadmapSchema>;
