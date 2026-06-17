import { formatRoadmap } from '@/utils/formatRoadmap';

import type { SupabaseClient } from '@supabase/supabase-js';

export const getRoadmapForViewCore = async (
  supabase: SupabaseClient,
  id: { id: string },
) => {
  const { data, error } = await supabase
    .from('roadmaps')
    .select(
      `
      id,
      title,
      description,
      is_public,
      user_id,
      created_at,
      updated_at,
      nodes: published_nodes,
      edges: published_edges,
      viewport: published_viewport
    `,
    )
    .eq('id', id)
    .eq('is_public', true)
    .maybeSingle();

  if (error) {
    throw new Error('Не удалось загрузить Roadmap');
  }

  if (!data) return null;

  return formatRoadmap(data);
};
