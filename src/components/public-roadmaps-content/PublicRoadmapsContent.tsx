'use server';

import { Suspense } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { PublicRoadmapsList } from '@/components/public-roadmaps-list';
import { SpinnerFallback } from '@/components/spinner-fallback';
import { ROADMAPS } from '@/constants/queries';
import { getQueryClient } from '@/lib/tanstack-query';
import { getPublicRoadmapsServer } from '@/services/roadmaps';

export async function PublicRoadmapsContent() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [ROADMAPS, { search: undefined, orderBy: 'newest' }],
    queryFn: () =>
      getPublicRoadmapsServer({ search: undefined, orderBy: 'newest' }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<SpinnerFallback />}>
        <PublicRoadmapsList />
      </Suspense>
    </HydrationBoundary>
  );
}
