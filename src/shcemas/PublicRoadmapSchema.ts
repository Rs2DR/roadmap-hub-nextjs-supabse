import z from 'zod';

import { RoadmapBaseSchema } from './RoadmapBaseSchema';

export const PublicRoadmapSchema = RoadmapBaseSchema.extend({
  is_bookmarked: z.array(z.object({ id: z.string() })).catch([]),
}).transform(
  ({
    roadmap_comments,
    roadmap_likes,
    is_bookmarked,
    created_at,
    updated_at,
    ...rest
  }) => ({
    ...rest,
    createdAt: created_at,
    updatedAt: updated_at,
    likesCount: roadmap_likes[0].count,
    commentsCount: roadmap_comments[0].count,
    isBookmarked: is_bookmarked.length > 0,
  }),
);

export type PublicRoadmap = z.infer<typeof PublicRoadmapSchema>;
