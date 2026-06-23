import { queryOptions } from '@tanstack/react-query';

import { getRoadmapForViewApiClient } from '@/api-client/roadmaps';
import { ROADMAPS_KEY } from '@/constants/queries';

interface GetRoadmapForViewQueryOptionsParams {
  id: string;
}

export const getRoadmapForViewQueryOptions = ({
  id,
}: GetRoadmapForViewQueryOptionsParams) =>
  queryOptions({
    queryKey: [ROADMAPS_KEY, id],
    queryFn: () => getRoadmapForViewApiClient({ id }),
  });
