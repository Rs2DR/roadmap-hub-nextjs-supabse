import type { SupabaseClient } from '@supabase/supabase-js';

export const deleteCommentOnRoadmapCore = async (
  supabase: SupabaseClient,
  params: { id: string; userId: string },
) => {
  const { id, userId } = params;

  const { error } = await supabase
    .from('roadmap_comments')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

  if (error) {
    throw new Error('Не удалось удалить комментарий или у вас нет прав');
  }
};
