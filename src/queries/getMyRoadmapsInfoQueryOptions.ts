import { queryOptions } from '@tanstack/react-query';

import { getMyRoadmapsInfoApiClient } from '@/api-client/roadmaps';
import { MY_ROADMAPS_KEY } from '@/constants/queries';

export const getMyRoadmapsInfoQueryOptions = () =>
  queryOptions({
    queryKey: [MY_ROADMAPS_KEY],
    queryFn: () => getMyRoadmapsInfoApiClient(),
  });
