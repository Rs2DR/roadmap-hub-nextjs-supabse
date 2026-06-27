import { queryOptions } from '@tanstack/react-query';

import { fetchUser } from '@/api-client/user';
import { USER_QUERY_KEY } from '@/constants/queries';

export const makeUserOptions = () =>
  queryOptions({
    queryKey: [USER_QUERY_KEY],
    queryFn: () => fetchUser(),
  });
