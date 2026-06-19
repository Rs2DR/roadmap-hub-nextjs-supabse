import z from 'zod';

import { PublicRoadmapSchema } from '@/shcemas/PublicRoadmapSchema';

import type { SupabaseClient } from '@supabase/supabase-js';

export const getBookmarkedRoadmapsCore = async (
  supabase: SupabaseClient,
  params: { userId: string },
) => {
  const { userId } = params;

  const { data, error } = await supabase
    .from('roadmaps')
    .select(
      `
      *,
      roadmap_likes(count),
      roadmap_comments(count),
      is_bookmarked:roadmap_bookmarks!inner(id) 
    `,
    )
    .eq('roadmap_bookmarks.user_id', userId);

  if (error) {
    throw new Error('Не удалось получить Roadmaps в закладках');
  }

  return z.array(PublicRoadmapSchema).parse(data);
};
