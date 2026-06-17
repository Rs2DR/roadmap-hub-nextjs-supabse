import { parseEnv } from 'node:util';

import { z } from 'zod';

import { RoadmapSchema } from '@/shcemas/RoadmapSchema';

import type { SupabaseClient } from '@supabase/supabase-js';

export const getMyRoadmapsInfoCore = async (
  supabase: SupabaseClient,
  params: { userId: string },
) => {
  const { userId } = params;

  const { data, error } = await supabase
    .from('roadmaps')
    .select('*, roadmap_likes(count), roadmap_comments(count)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('Не удалось загрузить ваши roadmap');
  }

  return z.array(RoadmapSchema).parse(data);
};
