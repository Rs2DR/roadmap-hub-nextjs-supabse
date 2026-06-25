import { z } from 'zod';

import { PublicRoadmapSchema } from '@/shcemas/PublicRoadmapSchema';

import type { SupabaseClient } from '@supabase/supabase-js';

import type { GetPublicRoadmapsInput } from '@/shcemas/GetPublicRoadmapsSchema';

export const getPublicRoadmapsCore = async (
  supabase: SupabaseClient,
  params: GetPublicRoadmapsInput,
) => {
  const { search, orderBy = 'newest', userId } = params;

  let query = supabase
    .from('roadmaps')
    .select(
      `
      id,
      title,
      description,
      created_at,
      updated_at,
      likes_count,               
      roadmap_comments(count),    
      is_liked:roadmap_likes(id), 
      is_bookmarked:roadmap_bookmarks(id)
    `,
    )
    .eq('roadmap_likes.user_id', userId)
    .eq('roadmap_bookmarks.user_id', userId)
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
