import type { SupabaseClient } from '@supabase/supabase-js';

export const publishRoadmapCore = async (
  supabase: SupabaseClient,
  params: { id: string },
) => {
  const { id } = params;

  const { error } = await supabase.rpc('publish_roadmap', {
    p_roadmap_id: id,
  });

  if (error) {
    throw new Error('Не удалось опубликовать карту');
  }

  return { success: true };
};
