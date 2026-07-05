import type { SupabaseClient } from '@supabase/supabase-js';

import type { MyRoadmapInfoInput } from '@/schemas/roadmap/form';

export const updateRoadmapInfoCore = async (
  supabase: SupabaseClient,
  params: MyRoadmapInfoInput & { id: string; userId: string },
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

  if (error) {
    throw new Error('Не удалось обновить roadmap');
  }

  return data;
};
