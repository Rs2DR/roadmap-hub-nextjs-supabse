import { PublicRoadmapGraphSchema } from '@/schemas/PublicRoadmapGraphSchema';

import type { SupabaseClient } from '@supabase/supabase-js';

export const getRoadmapForViewCore = async (
  supabase: SupabaseClient,
  params: { id: string; userId: string },
) => {
  const { id, userId } = params;

  const { data, error } = await supabase
    .from('roadmaps')
    .select(
      `
      id,
      title,
      description,
      created_at,
      updated_at,
      viewport,
      likes_count,                     
      is_liked: roadmap_likes(id),    
      is_bookmarked: roadmap_bookmarks(id),
      nodes: roadmap_nodes(id, type, position_x, position_y, data),
      edges: roadmap_edges(id, source, target, type, data)
    `,
    )
    .eq('id', id)
    .eq('roadmap_likes.user_id', userId)
    .eq('roadmap_bookmarks.user_id', userId)
    .single();

  console.log(error);

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

  return PublicRoadmapGraphSchema.parse(formattedGraph);
};
