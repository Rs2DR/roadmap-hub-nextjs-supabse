'use server';

import { addCommentOnRoadmapCore } from '@/core/roadmaps';
import { authActionClient } from '@/lib/next-safe-actions';
import { RoadmapCommentInputSchema } from '@/schemas/roadmap/form';

export const addCommentOnRoadmap = authActionClient
  .inputSchema(RoadmapCommentInputSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, userId } = ctx;
    const { roadmapId, content } = parsedInput;

    return addCommentOnRoadmapCore(supabase, {
      userId,
      roadmapId,
      content,
    });
  });
