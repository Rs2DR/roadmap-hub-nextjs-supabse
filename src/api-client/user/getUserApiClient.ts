import { http } from '@/lib/xior';

import type { User } from '@supabase/supabase-js';

export const getUserApiClient = async () => {
  const res = await http.get<User>('/me');

  return res.data;
};
