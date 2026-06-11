'use server';

import { createServerSupabase } from '@/lib/supabase/server';
import { RoadmapBaseSchema } from '@/shcemas/RoadmapBaseSchema';

import type { UpdateRoadmapVisibilityInput } from '@/shcemas/UpdateRoadmapVisibilitySchema';

export const updateRoadmapVisibility = async ({
  id,
  isPublic,
}: UpdateRoadmapVisibilityInput) => {
  const supabase = await createServerSupabase();

  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims();

  if (claimsError) throw new Error(claimsError.message);
  if (!claimsData) throw new Error('Пользователь не авторизован');

  const sub = claimsData.claims.sub;

  const { data, error } = await supabase
    .from('roadmaps')
    .update({
      is_public: isPublic,
    })
    .eq('id', id)
    .eq('user_id', sub)
    .select('is_public')
    .single();

  if (error) throw new Error(error.message);

  const parsed = RoadmapBaseSchema.pick({ is_public: true }).parse(data);

  return {
    success: true,
    isPublic: parsed.is_public,
  };
};
