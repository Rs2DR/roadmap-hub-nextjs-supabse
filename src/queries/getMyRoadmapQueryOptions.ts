import { queryOptions } from '@tanstack/react-query';

import { getMyRoadmaps } from '@/actions/roadmap/getMyRoadmaps';
import { MY_ROADMAPS_KEY } from '@/constants/queries';

export const getMyRoadmapsQueryOptions = () =>
  queryOptions({
    queryKey: [MY_ROADMAPS_KEY],
    queryFn: () => getMyRoadmaps(),
  });
