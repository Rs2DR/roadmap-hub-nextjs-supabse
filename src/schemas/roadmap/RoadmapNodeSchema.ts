import { RoadmapNodeDbSchema } from '@/schemas/roadmap/db';

import type z from 'zod';

export const RoadmapNodeSchema = RoadmapNodeDbSchema;

export type RoadmapNode = z.infer<typeof RoadmapNodeSchema>;
