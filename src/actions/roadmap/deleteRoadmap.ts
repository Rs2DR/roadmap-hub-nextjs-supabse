'use server';

import z from 'zod';

import { deleteRoadmapCore } from '@/core/roadmaps';
import { authActionClient } from '@/lib/next-safe-actions';
import { RoadmapBaseSchema } from '@/schemas/roadmap/db/RoadmapBaseInfoDbSchema';

export const deleteRoadmap = authActionClient
  .inputSchema(z.object({ id: RoadmapBaseSchema.shape.id }))
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, userId } = ctx;
    const { id } = parsedInput;

    return deleteRoadmapCore(supabase, {
      id,
      userId,
    });
  });
