import { queryOptions } from '@tanstack/react-query';

import { fetchRoadmapComments } from '@/api-client/roadmap';
import { ROADMAP_COMMENTS_KEY } from '@/constants/queries';

interface GetRoadmapCommentsQueryOptionsParams {
  id: string;
}

export const makeRoadmapCommentsOptions = ({
  id,
}: GetRoadmapCommentsQueryOptionsParams) => {
  return queryOptions({
    queryKey: [ROADMAP_COMMENTS_KEY, id],
    queryFn: () => fetchRoadmapComments({ id }),
  });
};
