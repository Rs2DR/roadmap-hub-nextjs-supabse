import { queryOptions } from '@tanstack/react-query';

import { getRoadmapForViewApiClient } from '@/api-client/roadmaps';
import { ROADMAP_VIEW_KEY } from '@/constants/queries';

interface GetRoadmapForViewQueryOptionsParams {
  id: string;
}

export const getRoadmapForViewQueryOptions = ({
  id,
}: GetRoadmapForViewQueryOptionsParams) =>
  queryOptions({
    queryKey: [ROADMAP_VIEW_KEY, id],
    queryFn: () => getRoadmapForViewApiClient({ id }),
  });
