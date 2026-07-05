import type { SupabaseClient } from '@supabase/supabase-js';

import type { RoadmapGraphInput } from '@/schemas/roadmap';

export const saveRoadmapGraphCore = async (
  supabase: SupabaseClient,
  params: RoadmapGraphInput,
) => {
  const { id, nodes, edges, viewport } = params;

  const { data, error } = await supabase.rpc('save_roadmap_graph', {
    p_roadmap_id: id,
    p_nodes: nodes,
    p_edges: edges,
    p_viewport: viewport,
  });

  if (error) {
    throw new Error('Не удалось сохранить roadmap');
  }

  return data;
};
