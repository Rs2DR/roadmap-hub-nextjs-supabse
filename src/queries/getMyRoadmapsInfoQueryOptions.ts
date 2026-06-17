import { queryOptions } from '@tanstack/react-query';

import { MY_ROADMAPS_KEY } from '@/constants/queries';
import { getMyRoadmapsInfoService } from '@/services/roadmaps';

export const getMyRoadmapsInfoQueryOptions = () =>
  queryOptions({
    queryKey: [MY_ROADMAPS_KEY],
    queryFn: () => getMyRoadmapsInfoService(),
  });
