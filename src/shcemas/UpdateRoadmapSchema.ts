import { ManageMyRoadmapSchema } from './ManageMyRoadmapSchema';
import { RoadmapSchema } from './RoadmapSchema';

import type { z } from 'zod';

export const UpdateRoadmapSchema = ManageMyRoadmapSchema.extend({
  id: RoadmapSchema.shape.id,
});

export type UpdateRoadmapInput = z.infer<typeof UpdateRoadmapSchema>;
