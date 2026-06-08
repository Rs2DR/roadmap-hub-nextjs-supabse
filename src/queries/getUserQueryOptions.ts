import { queryOptions } from '@tanstack/react-query';

import { getUser } from '@/actions/user/getUser';

export const getUserQueryOptions = () =>
  queryOptions({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });
