import { ManageMyRoadmapSchema } from './ManageMyRoadmapSchema';
import { RoadmapBaseSchema } from './RoadmapBaseSchema';

import type { z } from 'zod';

export const UpdateRoadmapSchema = ManageMyRoadmapSchema.extend({
  id: RoadmapBaseSchema.shape.id,
});

export type UpdateRoadmapInput = z.infer<typeof UpdateRoadmapSchema>;
