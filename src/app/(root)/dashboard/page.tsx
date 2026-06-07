import { Suspense } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { User } from '@/components/user';
import { createServerSupabase } from '@/lib/supabase/server';
import { getQueryClient } from '@/lib/tanstack-query/getQueryClient';

const getUser = async () => {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

export default async function DashboardPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>Основная страница</div>
      <Suspense fallback={<div>Загрузка...</div>}>
        <User />
      </Suspense>
    </HydrationBoundary>
  );
}

