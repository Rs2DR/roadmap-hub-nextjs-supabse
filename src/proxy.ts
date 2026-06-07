import { chain } from '@/lib/middleware/chain';
import { withSupabase } from './lib/middleware/supabase';
import { withAuthGuard } from './lib/middleware/auth-guard';

export default chain([withSupabase, withAuthGuard]);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

