import { queryOptions } from '@tanstack/react-query';

import { MY_ROADMAPS_KEY } from '@/constants/queries';
import { getRoadmapForEditService } from '@/services/roadmaps';

import type { Roadmap } from '@/shcemas/RoadmapSchema';

interface GetRoadmapForEditQueryOptionsParams {
  id: Roadmap['id'];
}

export const getRoadmapForEditQueryOptions = ({
  id,
}: GetRoadmapForEditQueryOptionsParams) =>
  queryOptions({
    queryKey: [MY_ROADMAPS_KEY, id],
    queryFn: () => getRoadmapForEditService({ id }),
  });
