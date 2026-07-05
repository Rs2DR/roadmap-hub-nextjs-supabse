import type { SupabaseClient } from '@supabase/supabase-js';

export const getMyRoadmapsInfoCore = async (
  supabase: SupabaseClient,
  params: { userId: string },
) => {
  const { userId } = params;

  const { data, error } = await supabase
    .from('roadmaps')
    .select(
      `
      id,
      title,
      description,
      is_public,
      created_at,
      updated_at,
      likes_count,           
      roadmap_comments(count) 
    `,
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('Не удалось загрузить ваши roadmap');
  }

  return data;
};
