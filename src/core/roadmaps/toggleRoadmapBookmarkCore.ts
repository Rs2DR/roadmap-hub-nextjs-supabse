import type { SupabaseClient } from '@supabase/supabase-js';

export const toggleRoadmapBookmarkCore = async (
  supabase: SupabaseClient,
  params: { id: string },
) => {
  const { id } = params;

  const { data, error } = await supabase.rpc('toggle_roadmap_bookmark', {
    target_roadmap_id: id,
  });

  if (error) {
    throw new Error('Не удалось переключить закладку');
  }

  return { isBookmarked: data as boolean };
};
