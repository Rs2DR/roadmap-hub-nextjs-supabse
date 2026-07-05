'use server';

import { saveRoadmapGraphCore } from '@/core/roadmaps';
import { authActionClient } from '@/lib/next-safe-actions';
import {
  RoadmapGraphBaseSchema,
  RoadmapGraphInputSchema,
} from '@/schemas/roadmap';

export const saveRoadmapGraph = authActionClient
  .inputSchema(RoadmapGraphInputSchema)
  .outputSchema(RoadmapGraphBaseSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { supabase } = ctx;
    const { id, nodes, edges, viewport } = parsedInput;

    return saveRoadmapGraphCore(supabase, { id, nodes, edges, viewport });
  });
