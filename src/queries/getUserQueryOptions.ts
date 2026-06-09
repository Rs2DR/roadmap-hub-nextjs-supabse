import { queryOptions } from '@tanstack/react-query';

import { getUser } from '@/actions/user/getUser';
import { USER_QUERY_KEY } from '@/constants/queries';

export const getUserQueryOptions = () =>
  queryOptions({
    queryKey: [USER_QUERY_KEY],
    queryFn: () => getUser(),
  });
