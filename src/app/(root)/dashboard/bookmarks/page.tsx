import { Suspense } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { BookmarkedRoadmapsList } from '@/components/bookmarked-roadmaps-list';
import { BOOKMARKED_ROADMAPS } from '@/constants/queries';
import { getQueryClient } from '@/lib/tanstack-query';
import { getBookmarkedRoadmapsServer } from '@/services/roadmaps';

export default async function BookmarksPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [BOOKMARKED_ROADMAPS],
    queryFn: () => getBookmarkedRoadmapsServer(),
  });

  return (
    <div className="px-4 pt-2">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <BookmarkedRoadmapsList />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
