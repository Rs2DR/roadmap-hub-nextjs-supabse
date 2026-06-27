import { queryOptions } from '@tanstack/react-query';

import { fetchMyRoadmapsInfo } from '@/api-client/roadmap';
import { MY_ROADMAPS_KEY } from '@/constants/queries';

export const makeMyRoadmapsInfoOptions = () =>
  queryOptions({
    queryKey: [MY_ROADMAPS_KEY],
    queryFn: () => fetchMyRoadmapsInfo(),
  });
