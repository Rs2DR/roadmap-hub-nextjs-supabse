import { z } from 'zod';

import { RoadmapGraphBaseDbSchema } from '@/schemas/roadmap/db';

export const PublicRoadmapGraphDbSchema = RoadmapGraphBaseDbSchema.extend({
  title: z
    .string('Некорректный формат загаловка')
    .nonempty('Название обязательно'),
  description: z
    .string('Некорректный формат описания')
    .nonempty('Описание обязательно')
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
});

export type PublicRoadmapGraphDb = z.infer<typeof PublicRoadmapGraphDbSchema>;
