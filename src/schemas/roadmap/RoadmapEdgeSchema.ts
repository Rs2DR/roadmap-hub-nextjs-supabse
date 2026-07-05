import { RoadmapEdgeDbSchema } from '@/schemas/roadmap/db';

import type z from 'zod';

export const RoadmapEdgeSchema = RoadmapEdgeDbSchema;

export type RoadmapEdge = z.infer<typeof RoadmapEdgeSchema>;
