'use server';

import { createServerSupabase } from '@/lib/supabase/server';

import type { ManageMyRoadmapInput } from '@/shcemas/manageMyRoadmapSchema';

export const createRoadmap = async ({
  title,
  description,
}: ManageMyRoadmapInput) => {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Не авторизован');

  const { data, error } = await supabase.from('roadmaps').insert([
    {
      title,
      description,
      user_id: user.id,
    },
  ]);

  if (error) throw new Error(error.message);

  return { success: true, data };
};
