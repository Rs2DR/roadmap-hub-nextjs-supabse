import type { SupabaseClient } from '@supabase/supabase-js';

export const bookmarkRoadmapCore = async (
  supabase: SupabaseClient,
  params: { id: string; userId: string },
) => {
  const { userId, id } = params;

  const { error } = await supabase
    .from('roadmap_likes')
    .insert({ roadmap_id: id, user_id: userId });

  if (error) {
    throw new Error('Не удалось добавить в закладки');
  }

  return { success: true };
};
