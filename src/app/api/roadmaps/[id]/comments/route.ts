import { NextResponse } from 'next/server';

import { getRoadmapForViewCore } from '@/core/roadmaps';
import { getRoadmapCommentsCore } from '@/core/roadmaps/getRoadmapCommentsCore';
import { requireAuth } from '@/lib/supabase';

import type { NextRequest } from 'next/server';

export async function GET(
  _: NextRequest,
  ctx: RouteContext<'/api/roadmaps/[id]/comments'>,
) {
  try {
    const { id } = await ctx.params;

    const { supabase } = await requireAuth();

    const comments = await getRoadmapCommentsCore(supabase, {
      roadmapId: id,
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: 'Не удалось загрузить комментарии' },
      { status: 500 },
    );
  }
}
