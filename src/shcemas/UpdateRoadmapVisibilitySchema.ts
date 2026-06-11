import z from 'zod';

import { RoadmapBaseSchema } from './RoadmapBaseSchema';

export const UpdateRoadmapVisibilitySchema = z.object({
  id: RoadmapBaseSchema.shape.id,
  isPublic: RoadmapBaseSchema.shape.is_public,
});

export type UpdateRoadmapVisibilityInput = z.infer<
  typeof UpdateRoadmapVisibilitySchema
>;
