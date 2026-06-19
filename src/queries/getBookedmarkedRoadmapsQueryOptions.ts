import { queryOptions } from '@tanstack/react-query';

import { getBookmarkedRoadmapsApiClient } from '@/api-client/roadmaps';
import { BOOKMARKED_ROADMAPS } from '@/constants/queries';

export const getBookmarkedRoadmapsQueryOptions = () =>
  queryOptions({
    queryKey: [BOOKMARKED_ROADMAPS],
    queryFn: () => getBookmarkedRoadmapsApiClient(),
  });
