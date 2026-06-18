import type { SupabaseClient } from '@supabase/supabase-js';

export const unbookmarkRoadmapCore = async (
  supabase: SupabaseClient,
  params: { id: string; userId: string },
) => {
  const { userId, id } = params;

  const { error } = await supabase
    .from('roadmap_likes')
    .delete()
    .eq('roadmap_id', id)
    .eq('user_id', userId);

  if (error) {
    throw new Error('Не удалось удалить из закладок');
  }

  return { success: true };
};
