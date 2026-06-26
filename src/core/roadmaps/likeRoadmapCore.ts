import type { SupabaseClient } from '@supabase/supabase-js';

export const likeRoadmapCore = async (
  supabase: SupabaseClient,
  { id }: { id: string },
) => {
  const { data, error } = await supabase.rpc('toggle_roadmap_like', {
    p_roadmap_id: id,
  });

  if (error) {
    throw new Error('Не удалось изменить статус лайка');
  }

  return { isLiked: data as boolean };
};
