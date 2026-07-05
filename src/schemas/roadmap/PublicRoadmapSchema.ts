import { PublicRoadmapInfoDbSchema } from '@/schemas/roadmap/db';

import type z from 'zod';

export const PublicRoadmapInfoSchema = PublicRoadmapInfoDbSchema.transform(
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

export type PublicRoadmapInfo = z.infer<typeof PublicRoadmapInfoSchema>;
