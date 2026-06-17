'use server';

import { updateRoadmapInfoCore } from '@/core/roadmaps';
import { authActionClient } from '@/lib/next-safe-actions';
import { ManageMyRoadmapSchema } from '@/shcemas/ManageMyRoadmapSchema';
import { RoadmapBaseSchema } from '@/shcemas/RoadmapBaseSchema';

export const updateRoadmapInfo = authActionClient
  .inputSchema(
    ManageMyRoadmapSchema.extend({
      id: RoadmapBaseSchema.shape.id,
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, userId } = ctx;
    const { id, title, description } = parsedInput;

    return updateRoadmapInfoCore(supabase, {
      id,
      userId,
      title,
      description,
    });
  });
