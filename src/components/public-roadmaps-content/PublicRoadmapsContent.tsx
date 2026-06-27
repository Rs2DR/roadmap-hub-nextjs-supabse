'use server';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { PublicRoadmapsList } from '@/components/public-roadmaps-list';
import { ROADMAPS_KEY } from '@/constants/queries';
import { getQueryClient } from '@/lib/tanstack-query';
import { getPublicRoadmapsServer } from '@/services/roadmaps';

import type { RoadmapOrderBy } from '@/types/roadmap/RoadmapOrderBy';

interface PublicRoadmapsContentProps {
  search?: string;
  orderBy?: RoadmapOrderBy;
}

export async function PublicRoadmapsContent({
  search,
  orderBy = 'newest',
}: PublicRoadmapsContentProps) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [ROADMAPS_KEY, { search, orderBy }],
    queryFn: () => getPublicRoadmapsServer({ search, orderBy }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PublicRoadmapsList />
    </HydrationBoundary>
  );
}
