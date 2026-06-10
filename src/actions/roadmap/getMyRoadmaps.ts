'use server';

import z from 'zod';

import { createServerSupabase } from '@/lib/supabase/server';
import { RoadmapSchema } from '@/shcemas/RoadmapSchema';

export async function getMyRoadmaps() {
  const supabase = await createServerSupabase();

  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims();

  if (claimsError) throw new Error(claimsError.message);
  if (!claimsData) throw new Error('Пользователь не авторизован');

  const {
    claims: { sub },
  } = claimsData;

  const { data, error: roadmapsError } = await supabase
    .from('roadmaps')
    .select('*')
    .eq('user_id', sub)
    .order('created_at', { ascending: false });

  if (roadmapsError) throw new Error(roadmapsError.message);

  const parsedData = z.array(RoadmapSchema).parse(data);

  return { roadmaps: parsedData };
}
