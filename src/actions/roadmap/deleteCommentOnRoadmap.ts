'use server';

import z from 'zod';

import { deleteCommentOnRoadmapCore } from '@/core/roadmaps';
import { authActionClient } from '@/lib/next-safe-actions';
import { UuidSchema } from '@/schemas/common';

export const deleteCommentOnRoadmap = authActionClient
  .inputSchema(z.object({ id: UuidSchema }))
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, userId } = ctx;
    const { id } = parsedInput;

    return deleteCommentOnRoadmapCore(supabase, {
      userId,
      id,
    });
  });
