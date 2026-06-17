import { queryOptions } from '@tanstack/react-query';

import { USER_QUERY_KEY } from '@/constants/queries';
import { getUserService } from '@/services/roadmaps';

export const getUserQueryOptions = () =>
  queryOptions({
    queryKey: [USER_QUERY_KEY],
    queryFn: () => getUserService(),
  });
