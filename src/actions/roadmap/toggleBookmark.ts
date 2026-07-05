'use server';

import { z } from 'zod';

import { toggleRoadmapBookmarkCore } from '@/core/roadmaps';
import { authActionClient } from '@/lib/next-safe-actions';
import { UuidSchema } from '@/schemas/common';

export const toggleBookmarkAction = authActionClient
  .inputSchema(z.object({ id: UuidSchema }))
  .outputSchema(z.object({ isBookmarked: z.boolean() }))
  .action(async ({ parsedInput, ctx }) => {
    const { supabase } = ctx;
    const { id } = parsedInput;

    return toggleRoadmapBookmarkCore(supabase, { id });
  });
