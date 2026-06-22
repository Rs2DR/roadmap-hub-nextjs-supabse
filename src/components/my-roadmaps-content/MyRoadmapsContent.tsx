'use server';

import { Suspense } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { MyRoadmapsList } from '@/components/my-roadmaps-list';
import { SpinnerFallback } from '@/components/spinner-fallback';
import { MY_ROADMAPS_KEY } from '@/constants/queries';
import { getQueryClient } from '@/lib/tanstack-query';
import { getMyRoadmapsInfoServer } from '@/services/roadmaps';

export async function MyRoadmapsContent() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [MY_ROADMAPS_KEY],
    queryFn: () => getMyRoadmapsInfoServer(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<SpinnerFallback />}>
        <MyRoadmapsList />
      </Suspense>
    </HydrationBoundary>
  );
}
