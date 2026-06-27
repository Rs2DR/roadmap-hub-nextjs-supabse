'use server';

import z from 'zod';

import { likeRoadmapCore } from '@/core/roadmaps';
import { authActionClient } from '@/lib/next-safe-actions';
import { RoadmapBaseSchema } from '@/schemas/RoadmapBaseSchema';

export const likeRoadmap = authActionClient
  .inputSchema(z.object({ id: RoadmapBaseSchema.shape.id }))
  .action(async ({ parsedInput, ctx }) => {
    const { supabase } = ctx;
    const { id } = parsedInput;

    return likeRoadmapCore(supabase, { id });
  });
