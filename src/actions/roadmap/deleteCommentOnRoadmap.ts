'use server';

import z from 'zod';

import { deleteCommentOnRoadmapCore } from '@/core/roadmaps';
import { authActionClient } from '@/lib/next-safe-actions';
import { CommentBaseSchema } from '@/schemas/CommentBaseSchema';

export const deleteCommentOnRoadmap = authActionClient
  .inputSchema(z.object({ id: CommentBaseSchema.shape.id }))
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, userId } = ctx;
    const { id } = parsedInput;

    return deleteCommentOnRoadmapCore(supabase, {
      userId,
      id,
    });
  });
