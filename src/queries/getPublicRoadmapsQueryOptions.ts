import { queryOptions } from '@tanstack/react-query';

import { getPublicRoadmapsApiClient } from '@/api-client/roadmaps';
import { ROADMAPS_KEY } from '@/constants/queries';

import type { GetPublicRoadmapsInput } from '@/shcemas/GetPublicRoadmapsSchema';

type GetPublicRoadmapsQueryOptionsParams = Omit<
  GetPublicRoadmapsInput,
  'userId'
>;

export const getPublicRoadmapsQueryOptions = (
  params?: GetPublicRoadmapsQueryOptionsParams,
) => {
  const search = params?.search;
  const orderBy = params?.orderBy ?? 'newest';

  return queryOptions({
    queryKey: [ROADMAPS_KEY, { search, orderBy }],
    queryFn: () => getPublicRoadmapsApiClient({ search, orderBy }),
  });
};
