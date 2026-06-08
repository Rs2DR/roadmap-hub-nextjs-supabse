import { queryOptions } from '@tanstack/react-query';

import { createClientSupabase } from '@/lib/supabase/client';

export const getUserQueryOptions = () =>
  queryOptions({
    queryKey: ['user'],
    queryFn: async () => {
      const supabase = createClientSupabase();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    },
  });

