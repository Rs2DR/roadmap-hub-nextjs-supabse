'use server';

import z from 'zod';

import { authActionClient } from '@/lib/next-safe-actions/authActionClient';
import { RoadmapBaseSchema } from '@/shcemas/RoadmapBaseSchema';

export const deleteRoadmap = authActionClient
  .inputSchema(z.object({ id: RoadmapBaseSchema.shape.id }))
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, userId } = ctx;
    const { id } = parsedInput;

    const { error } = await supabase
      .from('roadmaps')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw new Error('Не удалось удалить roadmap');

    return { success: true };
  });
