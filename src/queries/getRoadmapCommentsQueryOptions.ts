import { queryOptions } from '@tanstack/react-query';

import { getRoadmapCommentsApiClient } from '@/api-client/roadmaps';
import { ROADMAP_COMMENTS_KEY } from '@/constants/queries';

interface GetRoadmapCommentsQueryOptionsParams {
  id: string;
}

export const getRoadmapCommentsQueryOptions = ({
  id,
}: GetRoadmapCommentsQueryOptionsParams) => {
  return queryOptions({
    queryKey: [ROADMAP_COMMENTS_KEY, id],
    queryFn: () => getRoadmapCommentsApiClient({ id }),
  });
};
