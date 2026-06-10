'use server';

import { createServerSupabase } from '@/lib/supabase/server';

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

  const { data: roadmapsData, error: roadmapsError } = await supabase
    .from('roadmaps')
    .insert([
      {
        title,
        description,
        user_id: sub,
      },
    ]);

  if (roadmapsError) throw new Error(roadmapsError.message);

  return { success: true, data: roadmapsData };
};
