import { chain } from '@/lib/middleware/chain';

import { withAuthGuard } from './lib/middleware/authGuard';
import { withSupabase } from './lib/middleware/supabase';

export default chain([withSupabase, withAuthGuard]);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
