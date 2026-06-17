// services/roadmaps/core/updateRoadmapInfo.ts

import { RoadmapSchema } from '@/shcemas/RoadmapSchema';

import type { SupabaseClient } from '@supabase/supabase-js';

import type { ManageMyRoadmapInput } from '@/shcemas/ManageMyRoadmapSchema';

export const updateRoadmapInfoCore = async (
  supabase: SupabaseClient,
  params: ManageMyRoadmapInput & { id: string; userId: string },
) => {
  const { id, userId, title, description } = params;

  const { data, error } = await supabase
    .from('roadmaps')
    .update({
      title,
      description,
    })
    .eq('id', id)
    .eq('user_id', userId)
    .select('*, roadmap_likes(count), roadmap_comments(count)')
    .single();

  console.log(data);

  if (error) {
    throw new Error('Не удалось обновить roadmap');
  }

  return RoadmapSchema.parse(data);
};
