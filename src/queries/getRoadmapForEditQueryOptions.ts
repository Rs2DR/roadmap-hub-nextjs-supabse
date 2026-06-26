import { queryOptions } from '@tanstack/react-query';

import { getRoadmapForEditApiClient } from '@/api-client/roadmaps';
import { MY_ROADMAPS_KEY } from '@/constants/queries';

interface GetRoadmapForEditQueryOptionsParams {
  id: string;
}

export const getRoadmapForEditQueryOptions = ({
  id,
}: GetRoadmapForEditQueryOptionsParams) =>
  queryOptions({
    queryKey: [MY_ROADMAPS_KEY, id],
    queryFn: () => getRoadmapForEditApiClient({ id }),
  });
