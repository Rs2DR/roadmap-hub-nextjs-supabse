import { queryOptions } from '@tanstack/react-query';

import { fetchPublicRoadmaps } from '@/api-client/roadmap';
import { ROADMAPS_KEY } from '@/constants/queries';

import type { GetPublicRoadmapsInput } from '@/schemas/roadmap/form/PublicRoadmapsInputSchema';

type GetPublicRoadmapsQueryOptionsParams = Omit<
  GetPublicRoadmapsInput,
  'userId'
>;

export const makePublicRoadmapsOptions = ({
  search,
  orderBy,
}: GetPublicRoadmapsQueryOptionsParams) => {
  return queryOptions({
    queryKey: [ROADMAPS_KEY, { search, orderBy }],
    queryFn: () => fetchPublicRoadmaps({ search, orderBy }),
  });
};
