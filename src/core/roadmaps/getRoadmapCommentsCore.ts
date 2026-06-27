import z from 'zod';

import { PublicCommentSchema } from '@/schemas/roadmap/PublicCommentSchema';

import type { SupabaseClient } from '@supabase/supabase-js';

export const getRoadmapCommentsCore = async (
  supabase: SupabaseClient,
  params: { roadmapId: string },
) => {
  const { roadmapId } = params;

  const { data, error } = await supabase.rpc('get_roadmap_comments', {
    p_roadmap_id: roadmapId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return z.array(PublicCommentSchema).parse(data);
};
