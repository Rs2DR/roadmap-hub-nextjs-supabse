import { getRoadmapForEditCore } from '@/core/roadmaps';
import { createServerSupabase } from '@/lib/supabase/server';

export const getRoadmapForEditServer = async ({ id }: { id: string }) => {
  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.getClaims();

  if (error) throw new Error('Пользователь не авторизован');

  return getRoadmapForEditCore(supabase, {
    id,
  });
};
