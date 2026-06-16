import { queryOptions } from '@tanstack/react-query';

import { getRoadmapForEdit } from '@/actions/roadmap/getRoadmapForEdit';
import { MY_ROADMAPS_KEY } from '@/constants/queries';
import { unwrapAction } from '@/lib/next-safe-actions/unwrapAction';

import type { Roadmap } from '@/shcemas/RoadmapSchema';

interface GetRoadmapForEditQueryOptionsParams {
  id: Roadmap['id'];
}

export const getRoadmapForEditQueryOptions = ({
  id,
}: GetRoadmapForEditQueryOptionsParams) =>
  queryOptions({
    queryKey: [MY_ROADMAPS_KEY, id],
    queryFn: () => unwrapAction(getRoadmapForEdit({ id })),
  });
