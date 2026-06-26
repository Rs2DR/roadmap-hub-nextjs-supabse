import { chain, withAuthGuard, withSupabase } from '@/lib/middleware';

export default chain([withSupabase, withAuthGuard]);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
