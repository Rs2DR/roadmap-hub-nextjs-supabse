import { queryOptions } from '@tanstack/react-query';

import { getBookmarkedRoadmapsApiClient } from '@/api-client/roadmaps';
import { BOOKMARKED_ROADMAPS_KEY } from '@/constants/queries';

export const getBookmarkedRoadmapsQueryOptions = () =>
  queryOptions({
    queryKey: [BOOKMARKED_ROADMAPS_KEY],
    queryFn: () => getBookmarkedRoadmapsApiClient(),
  });
