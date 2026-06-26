'use server';

import { createRoadmapCore } from '@/core/roadmaps';
import { authActionClient } from '@/lib/next-safe-actions';
import { ManageMyRoadmapSchema } from '@/schemas/manageMyRoadmapSchema';

export const createRoadmap = authActionClient
  .inputSchema(ManageMyRoadmapSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, userId } = ctx;
    const { title, description } = parsedInput;

    return createRoadmapCore(supabase, {
      userId,
      title,
      description,
    });
  });
