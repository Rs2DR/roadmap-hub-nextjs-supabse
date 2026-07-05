'use server';

import { createRoadmapCore } from '@/core/roadmaps';
import { authActionClient } from '@/lib/next-safe-actions';
import { MyRoadmapInfoSchema } from '@/schemas/roadmap';
import { MyRoadmapInfoInputSchema } from '@/schemas/roadmap/form';

export const createRoadmap = authActionClient
  .inputSchema(MyRoadmapInfoInputSchema)
  .outputSchema(MyRoadmapInfoSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, userId } = ctx;
    const { title, description } = parsedInput;

    return createRoadmapCore(supabase, {
      userId,
      title,
      description,
    });
  });
