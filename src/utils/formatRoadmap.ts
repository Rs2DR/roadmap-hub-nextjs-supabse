import { RoadmapGraphSchema } from '@/shcemas/RoadmapGrahpSchema';
import { asObject } from '@/utils/asObject';
import { assertArray } from '@/utils/assertArray';
import { formatEdges } from '@/utils/formatEdges';
import { formatNodes } from '@/utils/formatNodes';

export const formatRoadmap = (roadmap: unknown) => {
  const r = asObject(roadmap);

  const result = {
    id: r.id,
    viewport: r.viewport,
    is_public: r.is_public,
    user_id: r.user_id,
    created_at: r.created_at,
    updated_at: r.updated_at,
    nodes: formatNodes(assertArray(r.nodes, 'nodes')),
    edges: formatEdges(assertArray(r.edges, 'edges')),
  };

  console.log(result);

  return RoadmapGraphSchema.parse(result);
};
