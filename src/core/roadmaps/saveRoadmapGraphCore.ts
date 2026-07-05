import { RoadmapGraphSchema } from '@/schemas/roadmap/db/RoadmapGrahpBaseDbSchema';

import type { SupabaseClient } from '@supabase/supabase-js';

import type { SaveRoadmapGraphInput } from '@/schemas/roadmap/RoadmapGraphInputSchema';

export const saveRoadmapGraphCore = async (
  supabase: SupabaseClient,
  params: SaveRoadmapGraphInput,
) => {
  const { id, nodes, edges, viewport } = params;

  const { data, error } = await supabase.rpc('save_roadmap_graph', {
    p_roadmap_id: id,
    p_nodes: nodes,
    p_edges: edges,
    p_viewport: viewport,
  });

  console.log(error);

  if (error) {
    throw new Error('Не удалось сохранить roadmap');
  }

  return RoadmapGraphSchema.parse(data);
};
