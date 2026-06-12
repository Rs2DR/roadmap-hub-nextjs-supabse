'use server';

import { createServerSupabase } from '@/lib/supabase/server';

import type { Roadmap } from '@/shcemas/RoadmapSchema';

interface DeleteRoadmapParams {
  id: Roadmap['id'];
}

export const deleteRoadmap = async ({ id }: DeleteRoadmapParams) => {
  const supabase = await createServerSupabase();

  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims();

  if (claimsError) throw new Error(claimsError.message);
  if (!claimsData) throw new Error('Пользователь не авторизован');

  const sub = claimsData.claims.sub;

  const { error } = await supabase
    .from('roadmaps')
    .delete()
    .eq('id', id)
    .eq('user_id', sub);

  if (error) throw new Error(error.message);

  return {
    success: true,
    data: { id },
  };
};
