import { PublicRoadmapGraphDbSchema } from '@/schemas/roadmap/db';

import type { z } from 'zod';

export const PublicRoadmapGraphSchema = PublicRoadmapGraphDbSchema.transform(
  ({ is_liked, is_bookmarked, ...rest }) => ({
    isLiked: is_liked,
    isBookmarked: is_bookmarked,
    ...rest,
  }),
);

export type PublicRoadmapGraph = z.infer<typeof PublicRoadmapGraphSchema>;
