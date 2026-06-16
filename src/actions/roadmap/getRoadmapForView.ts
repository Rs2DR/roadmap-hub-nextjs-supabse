'use server';

import { z } from 'zod';

import { authActionClient } from '@/lib/next-safe-actions/authActionClient';
import { RoadmapBaseSchema } from '@/shcemas/RoadmapBaseSchema';
import { formatRoadmap } from '@/utils/formatRoadmap';

export const getRoadmapForViewAction = authActionClient
  .inputSchema(z.object({ id: RoadmapBaseSchema.shape.id }))
  .action(async ({ parsedInput, ctx }) => {
    const { supabase } = ctx;

    const { data: roadmap } = await supabase
      .from('roadmaps')
      .select(
        `
        id,
        title,
        description,
        is_public,
        user_id,
        created_at,
        updated_at,
        nodes: published_nodes,
        edges: published_edges,
        viewport: published_viewport
      `,
      )
      .eq('slug', parsedInput.id)
      .eq('is_public', true)
      .maybeSingle();

    if (!roadmap) return null;

    return formatRoadmap(roadmap);
  });
