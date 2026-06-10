import { z } from 'zod';

import { ManageMyRoadmapSchema } from './ManageMyRoadmapSchema';

export const UpdateRoadmapSchema = ManageMyRoadmapSchema.extend({
  id: z.uuid(),
});

export type UpdateRoadmapInput = z.infer<typeof UpdateRoadmapSchema>;
