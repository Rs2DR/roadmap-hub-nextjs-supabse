import type { SupabaseClient } from '@supabase/supabase-js';

import type { RoadmapCommentInput } from '@/schemas/roadmap/form';

export const addCommentOnRoadmapCore = async (
  supabase: SupabaseClient,
  params: RoadmapCommentInput & { userId: string },
) => {
  const { roadmapId, content, userId } = params;

  const { error } = await supabase.from('roadmap_comments').insert({
    roadmap_id: roadmapId,
    content: content,
    user_id: userId,
  });

  if (error) {
    throw new Error(error.message);
  }
};
