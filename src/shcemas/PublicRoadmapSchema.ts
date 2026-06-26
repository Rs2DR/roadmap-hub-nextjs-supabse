import z from 'zod';

import { RoadmapBaseSchema } from './RoadmapBaseSchema';

export const PublicRoadmapSchema = RoadmapBaseSchema.extend({
  is_liked: z
    .array(z.object({ id: z.string() }))
    .max(1)
    .optional()
    .default([])
    .transform((arr) => arr.length > 0),
  is_bookmarked: z
    .array(z.object({ id: z.string() }))
    .max(1)
    .optional()
    .default([])
    .transform((arr) => arr.length > 0),
}).transform(
  ({
    roadmap_comments,
    likes_count,
    is_bookmarked,
    created_at,
    updated_at,
    is_liked,
    ...rest
  }) => ({
    ...rest,
    createdAt: created_at,
    updatedAt: updated_at,
    isLiked: is_liked,
    likesCount: likes_count,
    commentsCount: roadmap_comments[0].count,
    isBookmarked: is_bookmarked,
  }),
);

export type PublicRoadmap = z.infer<typeof PublicRoadmapSchema>;
