'use server';

import { createServerSupabase } from '@/lib/supabase/server';
import { RoadmapSchema } from '@/shcemas/RoadmapSchema';

type UpdateRoadmapInput = {
  id: string;
  title: string;
  description: string;
};

export const updateRoadmap = async ({
  id,
  title,
  description,
}: UpdateRoadmapInput) => {
  const supabase = await createServerSupabase();

  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims();

  if (claimsError) throw new Error(claimsError.message);
  if (!claimsData) throw new Error('Пользователь не авторизован');

  const sub = claimsData.claims.sub;

  const { data, error } = await supabase
    .from('roadmaps')
    .update({
      title,
      description,
    })
    .eq('id', id)
    .eq('user_id', sub)
    .select()
    .single();

  if (error) throw new Error(error.message);

  const parsed = RoadmapSchema.parse(data);

  return { success: true, data: parsed };
};
