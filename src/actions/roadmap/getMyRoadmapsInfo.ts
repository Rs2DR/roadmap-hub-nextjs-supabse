'use server';

import { z } from 'zod';

import { authActionClient } from '@/lib/next-safe-actions/authActionClient';
import { RoadmapSchema } from '@/shcemas/RoadmapSchema';

export const getMyRoadmapsInfo = authActionClient.action(async ({ ctx }) => {
  const { supabase, userId } = ctx;

  const { data, error } = await supabase
    .from('roadmaps')
    .select('*, roadmap_likes(count), roadmap_comments(count)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error('Не удалось загрузить ваши roadmap');

  return z.array(RoadmapSchema).parse(data);
});
