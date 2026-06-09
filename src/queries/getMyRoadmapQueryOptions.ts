import { queryOptions } from '@tanstack/react-query';

import { getMyRoadmaps } from '@/actions/roadmap/getMyRoadmaps';
import { MY_ROADMAPS } from '@/constants/queries';

export const getMyRoadmapsQueryOptions = ({ userId }: { userId: string }) =>
  queryOptions({
    queryKey: [MY_ROADMAPS, userId],
    queryFn: () => getMyRoadmaps(userId),
    enabled: !!userId,
  });
