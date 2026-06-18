import z from 'zod';

import { RoadmapBaseSchema } from './RoadmapBaseSchema';

export const PublicRoadmapSchema = RoadmapBaseSchema.extend({
  isBookmarked: z.boolean(),
  author: z.object({ name: z.string() }),
}).transform(
  ({
    roadmap_comments,
    roadmap_likes,
    created_at,
    updated_at,
    author,
    ...rest
  }) => ({
    ...rest,
    createdAt: created_at,
    updatedAt: updated_at,
    likesCount: roadmap_likes[0].count,
    commentsCount: roadmap_comments[0].count,
    authorName: author.name,
  }),
);

export type PublicRoadmap = z.infer<typeof PublicRoadmapSchema>;
