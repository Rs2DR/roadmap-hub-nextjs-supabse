'use server';

import z from 'zod';

import { publishRoadmapCore } from '@/core/roadmaps';
import { authActionClient } from '@/lib/next-safe-actions';
import { UuidSchema } from '@/schemas/common';

export const publishRoadmap = authActionClient
  .inputSchema(z.object({ id: UuidSchema }))
  .action(async ({ parsedInput, ctx }) => {
    const { supabase } = ctx;
    const { id } = parsedInput;

    return publishRoadmapCore(supabase, {
      id,
    });
  });
