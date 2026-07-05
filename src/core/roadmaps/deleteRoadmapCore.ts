import type { SupabaseClient } from '@supabase/supabase-js';

export const deleteRoadmapCore = async (
  supabase: SupabaseClient,
  params: { userId: string; id: string },
) => {
  const { id, userId } = params;

  const { error } = await supabase
    .from('roadmaps')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

  if (error) {
    throw new Error('Не удалось удалить roadmap');
  }
};
