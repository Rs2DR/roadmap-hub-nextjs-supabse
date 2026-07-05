import { MyRoadmapSchema } from '@/schemas/MyRoadmapSchema';

import type { SupabaseClient } from '@supabase/supabase-js';

import type { ManageMyRoadmapInput } from '@/schemas/roadmap/form/MyRoadmapInfoInputSchema';

export const createRoadmapCore = async (
  supabase: SupabaseClient,
  params: ManageMyRoadmapInput & { userId: string },
) => {
  const { userId, title, description } = params;

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

  return MyRoadmapSchema.parse(data);
};
