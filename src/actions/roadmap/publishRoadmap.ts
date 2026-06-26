'use server';

import z from 'zod';

import { publishRoadmapCore } from '@/core/roadmaps';
import { authActionClient } from '@/lib/next-safe-actions';
import { RoadmapBaseSchema } from '@/shcemas/RoadmapBaseSchema';

export const publishRoadmap = authActionClient
  .inputSchema(z.object({ id: RoadmapBaseSchema.shape.id }))
  .action(async ({ parsedInput, ctx }) => {
    const { supabase } = ctx;
    const { id } = parsedInput;

    return publishRoadmapCore(supabase, {
      id,
    });
  });
