import { queryOptions } from '@tanstack/react-query';

import { getPublicRoadmapsApiClient } from '@/api-client/roadmaps';
import { ROADMAPS_KEY } from '@/constants/queries';

import type { GetPublicRoadmapsInput } from '@/schemas/GetPublicRoadmapsSchema';

type GetPublicRoadmapsQueryOptionsParams = Omit<
  GetPublicRoadmapsInput,
  'userId'
>;

export const getPublicRoadmapsQueryOptions = ({
  search,
  orderBy,
}: GetPublicRoadmapsQueryOptionsParams) => {
  return queryOptions({
    queryKey: [ROADMAPS_KEY, { search, orderBy }],
    queryFn: () => getPublicRoadmapsApiClient({ search, orderBy }),
  });
};
