import { RoadmapGraphSchema } from '@/schemas/RoadmapGrahpSchema';

import type { SupabaseClient } from '@supabase/supabase-js';

export const getRoadmapForEditCore = async (
  supabase: SupabaseClient,
  params: { id: string },
) => {
  const { id } = params;

  const { data, error } = await supabase
    .from('roadmaps')
    .select(
      `
      id,
      viewport,
      created_at,
      updated_at,
      nodes: roadmap_nodes(id, type, position_x, position_y, data),
      edges: roadmap_edges(id, source, target, type, data)
    `,
    )
    .eq('id', id)
    .single();

  if (error) {
    throw new Error('Не удалось загрузить Roadmap');
  }

  const formattedGraph = {
    ...data,
    nodes: data.nodes.map(({ position_x, position_y, ...rest }) => ({
      ...rest,
      position: {
        x: position_x,
        y: position_y,
      },
    })),
  };

  return RoadmapGraphSchema.parse(formattedGraph);
};
