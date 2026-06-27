import { queryOptions } from '@tanstack/react-query';

import { fetchRoadmapForView } from '@/api-client/roadmap';
import { ROADMAP_VIEW_KEY } from '@/constants/queries';

interface GetRoadmapForViewQueryOptionsParams {
  id: string;
}

export const makeRoadmapForViewOptions = ({
  id,
}: GetRoadmapForViewQueryOptionsParams) =>
  queryOptions({
    queryKey: [ROADMAP_VIEW_KEY, id],
    queryFn: () => fetchRoadmapForView({ id }),
  });
