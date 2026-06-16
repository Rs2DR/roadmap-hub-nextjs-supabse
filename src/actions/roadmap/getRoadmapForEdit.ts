'use server';

import z from 'zod';

import { authActionClient } from '@/lib/next-safe-actions/authActionClient';
import { createServerSupabase } from '@/lib/supabase/server';
import { RoadmapBaseSchema } from '@/shcemas/RoadmapBaseSchema';
import { formatRoadmap } from '@/utils/formatRoadmap';

export const getRoadmapForEdit = authActionClient
  .inputSchema(z.object({ id: RoadmapBaseSchema.shape.id }))
  .action(async ({ parsedInput }) => {
    const supabase = await createServerSupabase();

    const { data, error } = await supabase
      .from('roadmaps')
      .select(
        `
        *,
        nodes: roadmap_nodes(*),
        edges: roadmap_edges(*)
      `,
      )
      .eq('id', parsedInput.id)
      .single();

    if (error) throw new Error('Не удалось загрузить Roadmap');

    if (!data) return null;

    return formatRoadmap(data);
  });
