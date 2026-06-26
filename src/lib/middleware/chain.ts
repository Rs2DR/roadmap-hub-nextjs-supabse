import { NextResponse } from 'next/server';

import type { NextFetchEvent, NextRequest } from 'next/server';

export type MiddlewareFactory = (
  middleware: (
    request: NextRequest,
    event: NextFetchEvent,
  ) => Promise<NextResponse>,
) => (request: NextRequest, event: NextFetchEvent) => Promise<NextResponse>;

export function chain(
  functions: MiddlewareFactory[],
  index = 0,
): (request: NextRequest, event: NextFetchEvent) => Promise<NextResponse> {
  const current = functions[index];

  if (current) {
    const next = chain(functions, index + 1);
    return current(next);
  }

  return async (request: NextRequest, _event: NextFetchEvent) => {
    return NextResponse.next({ request });
  };
}

