'use server';

import z from 'zod';

import { unbookmarkRoadmapCore } from '@/core/roadmaps';
import { authActionClient } from '@/lib/next-safe-actions';
import { RoadmapBaseSchema } from '@/shcemas/RoadmapBaseSchema';

export const unbookmarkRoadmap = authActionClient
  .inputSchema(z.object({ id: RoadmapBaseSchema.shape.id }))
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, userId } = ctx;
    const { id } = parsedInput;

    return unbookmarkRoadmapCore(supabase, { id, userId });
  });
