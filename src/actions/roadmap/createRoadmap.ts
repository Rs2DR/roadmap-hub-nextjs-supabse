'use server';

import { createServerSupabase } from '@/lib/supabase/server';
import { RoadmapSchema } from '@/shcemas/RoadmapSchema';

import type { ManageMyRoadmapInput } from '@/shcemas/ManageMyRoadmapSchema';

export const createRoadmap = async ({
  title,
  description,
}: ManageMyRoadmapInput) => {
  const supabase = await createServerSupabase();

  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims();

  if (claimsError) throw new Error(claimsError.message);
  if (!claimsData) throw new Error('Пользователь не авторизован');

  const {
    claims: { sub },
  } = claimsData;

  const { data, error: createdRoadmapError } = await supabase
    .from('roadmaps')
    .insert([
      {
        title,
        description,
        user_id: sub,
      },
    ])
    .select('*, roadmap_likes(count), roadmap_comments(count)')
    .single();

  console.log(data);

  if (createdRoadmapError) throw new Error(createdRoadmapError.message);

  const parsed = RoadmapSchema.parse(data);

  return { success: true, data: parsed };
};
