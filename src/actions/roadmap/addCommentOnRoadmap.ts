'use server';

import { addCommentOnRoadmapCore } from '@/core/roadmaps';
import { authActionClient } from '@/lib/next-safe-actions';
import { CreateCommentSchema } from '@/schemas/CreateCommentSchema';

export const addCommentOnRoadmap = authActionClient
  .inputSchema(CreateCommentSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, userId } = ctx;
    const { roadmapId, content } = parsedInput;

    return addCommentOnRoadmapCore(supabase, {
      userId,
      roadmapId,
      content,
    });
  });
