import { queryOptions } from '@tanstack/react-query';

import { fetchBookmarkedRoadmaps } from '@/api-client/roadmap';
import { BOOKMARKED_ROADMAPS_KEY } from '@/constants/queries';

export const makeBookmarkedRoadmapsOptions = () =>
  queryOptions({
    queryKey: [BOOKMARKED_ROADMAPS_KEY],
    queryFn: () => fetchBookmarkedRoadmaps(),
  });
