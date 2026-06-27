import { queryOptions } from '@tanstack/react-query';

import { fetchRoadmapForEdit } from '@/api-client/roadmap';
import { MY_ROADMAPS_KEY } from '@/constants/queries';

interface GetRoadmapForEditQueryOptionsParams {
  id: string;
}

export const makeRoadmapForEditOptions = ({
  id,
}: GetRoadmapForEditQueryOptionsParams) =>
  queryOptions({
    queryKey: [MY_ROADMAPS_KEY, id],
    queryFn: () => fetchRoadmapForEdit({ id }),
  });
