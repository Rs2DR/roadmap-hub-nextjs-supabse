import { z } from 'zod';

import { RoadmapGraphSchema } from '@/shcemas/RoadmapGrahpSchema';

export const PublicRoadmapGraphSchema = RoadmapGraphSchema.extend({
  title: z.string().min(1, 'Название обязательно'),
  description: z
    .string()
    .nullable()
    .transform((val) => val ?? ''),
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
}).transform(({ is_liked, is_bookmarked, ...rest }) => ({
  isLiked: is_liked,
  isBookmarked: is_bookmarked,
  ...rest,
}));

export type PublicRoadmapGraph = z.infer<typeof PublicRoadmapGraphSchema>;
