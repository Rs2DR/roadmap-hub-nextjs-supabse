import { chain } from '@/lib/middleware/chain';
import { withSupabase } from './lib/middleware/supabase';

export default chain([withSupabase]);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

