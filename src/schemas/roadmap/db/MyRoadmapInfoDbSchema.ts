import z from 'zod';

import { RoadmapBaseInfoDbSchema } from '@/schemas/roadmap/db';

export const MyRoadmapInfoDbSchema = RoadmapBaseInfoDbSchema.extend({
  is_public: z.boolean('Некорректное значение публичности'),
});

export type MyRoadmapInfoDb = z.infer<typeof MyRoadmapInfoDbSchema>;
