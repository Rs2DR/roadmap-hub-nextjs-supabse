import { queryOptions } from '@tanstack/react-query';

import { getMyRoadmapsInfo } from '@/actions/roadmap/getMyRoadmapsInfo';
import { MY_ROADMAPS_KEY } from '@/constants/queries';
import { unwrapAction } from '@/lib/next-safe-actions/unwrapAction';

export const getMyRoadmapsInfoQueryOptions = () =>
  queryOptions({
    queryKey: [MY_ROADMAPS_KEY],
    queryFn: () => unwrapAction(getMyRoadmapsInfo()),
  });
