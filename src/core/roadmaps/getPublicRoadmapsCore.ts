import z from 'zod';

import { PublicRoadmapSchema } from '@/shcemas/PublicRoadmapSchema';

import type { SupabaseClient } from '@supabase/supabase-js';

import type { GetPublicRoadmapsInput } from '@/shcemas/GetPublicRoadmapsSchema';

export const getPublicRoadmapsCore = async (
  supabase: SupabaseClient,
  params: GetPublicRoadmapsInput,
) => {
  const { search, orderBy = 'newest', userId } = params;

  const selectQuery = `
    *,
    roadmap_likes(count),
    roadmap_comments(count),
    is_bookmarked:roadmap_bookmarks!left(id)${userId ? `?user_id=eq.${userId}` : ''},
  `;

  let query = supabase
    .from('roadmaps')
    .select(selectQuery)
    .eq('is_public', true);

  if (search && search.trim() !== '') {
    query = query.ilike('title', `%${search.trim()}%`);
  }

  if (orderBy === 'newest') {
    query = query.order('created_at', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: true });
  }

  const { data, error } = await query;

  if (error) {
    throw new Error('Не удалось получить опубликованные Roadmaps');
  }

  return z.array(PublicRoadmapSchema).parse(data);
};
