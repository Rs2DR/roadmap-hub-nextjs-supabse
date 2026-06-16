'use server';

import { authActionClient } from '@/lib/next-safe-actions/authActionClient';
import { ManageMyRoadmapSchema } from '@/shcemas/ManageMyRoadmapSchema';
import { RoadmapBaseSchema } from '@/shcemas/RoadmapBaseSchema';
import { RoadmapSchema } from '@/shcemas/RoadmapSchema';

export const updateRoadmapInfo = authActionClient
  .inputSchema(ManageMyRoadmapSchema.extend({ id: RoadmapBaseSchema.shape.id }))
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, userId } = ctx;
    const { id, title, description } = parsedInput;

    const { data, error } = await supabase
      .from('roadmaps')
      .update({
        title,
        description,
      })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw new Error('Не удалось обновить roadmap');

    return RoadmapSchema.parse(data);
  });
