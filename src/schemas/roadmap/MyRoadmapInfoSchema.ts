import { MyRoadmapInfoDbSchema } from '@/schemas/roadmap/db';

import type z from 'zod';

export const MyRoadmapInfoSchema = MyRoadmapInfoDbSchema.transform(
  ({
    roadmap_comments,
    likes_count,
    is_public,
    created_at,
    updated_at,
    ...rest
  }) => ({
    ...rest,
    isPublic: is_public,
    createdAt: created_at,
    updatedAt: updated_at,
    likesCount: likes_count,
    commentsCount: roadmap_comments[0].count,
  }),
);

export type MyRoadmapInfo = z.infer<typeof MyRoadmapInfoSchema>;
