'use server';

import { saveRoadmapGraphCore } from '@/core/roadmaps';
import { authActionClient } from '@/lib/next-safe-actions';
import { SaveRoadmapGraphSchema } from '@/shcemas/SaveRoadmapGraphSchema';

export const saveRoadmapGraph = authActionClient
  .inputSchema(SaveRoadmapGraphSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { supabase } = ctx;
    const { id, nodes, edges, viewport } = parsedInput;

    console.log(parsedInput);

    return saveRoadmapGraphCore(supabase, { id, nodes, edges, viewport });
  });
