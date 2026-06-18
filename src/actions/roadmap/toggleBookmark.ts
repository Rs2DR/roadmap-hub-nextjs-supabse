'use server';

import { z } from 'zod';

import { toggleRoadmapBookmarkCore } from '@/core/roadmaps';
import { authActionClient } from '@/lib/next-safe-actions';

export const toggleBookmarkAction = authActionClient
  .inputSchema(z.object({ id: z.uuid() }))
  .action(async ({ parsedInput, ctx }) => {
    const { supabase } = ctx;
    const { id } = parsedInput;

    return toggleRoadmapBookmarkCore(supabase, { id });
  });
