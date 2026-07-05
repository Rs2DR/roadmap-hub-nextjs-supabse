import z from 'zod';

import { RoadmapBaseInfoDbSchema } from '@/schemas/roadmap/db';

export const PublicRoadmapInfoDbSchema = RoadmapBaseInfoDbSchema.extend({
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
});

export type PublicRoadmapInfoDb = z.infer<typeof PublicRoadmapInfoDbSchema>;
