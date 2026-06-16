'use server';

import { authActionClient } from '@/lib/next-safe-actions/authActionClient';
import { ManageMyRoadmapSchema } from '@/shcemas/ManageMyRoadmapSchema';
import { RoadmapSchema } from '@/shcemas/RoadmapSchema';

export const createRoadmap = authActionClient
  .inputSchema(ManageMyRoadmapSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, userId } = ctx;
    const { title, description } = parsedInput;

    const { data, error } = await supabase
      .from('roadmaps')
      .insert([
        {
          title,
          description,
          user_id: userId,
        },
      ])
      .select('*, roadmap_likes(count), roadmap_comments(count)')
      .single();

    if (error) {
      throw new Error('Не удалось создать roadmap');
    }

    return RoadmapSchema.parse(data);
  });
