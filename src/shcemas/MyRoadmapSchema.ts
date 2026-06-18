import z from 'zod';

import { RoadmapBaseSchema } from './RoadmapBaseSchema';

export const MyRoadmapSchema = RoadmapBaseSchema.extend({
  is_public: z.boolean(),
}).transform(
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

export type MyRoadmap = z.infer<typeof MyRoadmapSchema>;
