import { formatRoadmap } from '@/utils/formatRoadmap';

import type { SupabaseClient } from '@supabase/supabase-js';

export const getRoadmapForEditCore = async (
  supabase: SupabaseClient,
  id: { id: string },
) => {
  const { data, error } = await supabase
    .from('roadmaps')
    .select(
      `
      *,
      nodes: roadmap_nodes(*),
      edges: roadmap_edges(*)
    `,
    )
    .eq('id', id)
    .single();

  if (error) {
    throw new Error('Не удалось загрузить Roadmap');
  }

  if (!data) return null;

  return formatRoadmap(data);
};
