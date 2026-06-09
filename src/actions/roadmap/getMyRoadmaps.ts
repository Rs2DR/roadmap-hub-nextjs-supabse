'use server';

import { createServerSupabase } from '@/lib/supabase/server';

export async function getMyRoadmaps(userId: string) {
  const supabase = await createServerSupabase();

  const { data, error: roadmapsError } = await supabase
    .from('roadmaps')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (roadmapsError) throw new Error(roadmapsError.message);

  return data;
}
