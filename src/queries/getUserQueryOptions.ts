import { queryOptions } from '@tanstack/react-query';

import { getUserApiClient } from '@/api-client/user';
import { USER_QUERY_KEY } from '@/constants/queries';

export const getUserQueryOptions = () =>
  queryOptions({
    queryKey: [USER_QUERY_KEY],
    queryFn: () => getUserApiClient(),
  });
