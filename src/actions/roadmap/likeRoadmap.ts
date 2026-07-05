'use server';

import z from 'zod';

import { likeRoadmapCore } from '@/core/roadmaps';
import { authActionClient } from '@/lib/next-safe-actions';
import { UuidSchema } from '@/schemas/common';

export const likeRoadmap = authActionClient
  .inputSchema(z.object({ id: UuidSchema }))
  .outputSchema(z.object({ isLiked: z.boolean() }))
  .action(async ({ parsedInput, ctx }) => {
    const { supabase } = ctx;
    const { id } = parsedInput;

    return likeRoadmapCore(supabase, { id });
  });
