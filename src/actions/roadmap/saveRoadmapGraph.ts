'use server';

import { authActionClient } from '@/lib/next-safe-actions/authActionClient';
import { RoadmapGraphSchema } from '@/shcemas/RoadmapGrahpSchema';
import { SaveRoadmapGraphSchema } from '@/shcemas/SaveRoadmapGraphSchema';

export const saveRoadmapGraph = authActionClient
  .inputSchema(SaveRoadmapGraphSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { supabase } = ctx;
    const { id, nodes, edges, viewport } = parsedInput;

    const { data, error } = await supabase.rpc('save_roadmap_graph', {
      p_roadmap_id: id,
      p_nodes: nodes,
      p_edges: edges,
      p_viewport: viewport,
    });

    if (error) throw new Error('Не удалось сохранить roadmap');

    return RoadmapGraphSchema.parse(data);
  });
