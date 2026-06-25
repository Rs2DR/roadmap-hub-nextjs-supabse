'use server';

import { Suspense } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { BookmarkedRoadmapsList } from '@/components/bookmarked-roadmaps-list';
import { SpinnerFallback } from '@/components/spinner-fallback';
import { BOOKMARKED_ROADMAPS_KEY } from '@/constants/queries';
import { getQueryClient } from '@/lib/tanstack-query';
import { getBookmarkedRoadmapsServer } from '@/services/roadmaps';

export async function BookmarksContent() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [BOOKMARKED_ROADMAPS_KEY],
    queryFn: () => getBookmarkedRoadmapsServer(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BookmarkedRoadmapsList />
    </HydrationBoundary>
  );
}
