import { queryOptions } from '@tanstack/react-query';

import { getRoadmapForEditApiClient } from '@/api-client/roadmaps';
import { MY_ROADMAPS_KEY } from '@/constants/queries';

import type { Roadmap } from '@/shcemas/RoadmapSchema';

interface GetRoadmapForEditQueryOptionsParams {
  id: Roadmap['id'];
}

export const getRoadmapForEditQueryOptions = ({
  id,
}: GetRoadmapForEditQueryOptionsParams) =>
  queryOptions({
    queryKey: [MY_ROADMAPS_KEY, id],
    queryFn: () => getRoadmapForEditApiClient({ id }),
  });
