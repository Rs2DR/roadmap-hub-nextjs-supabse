import { NextResponse } from 'next/server';

import { getRoadmapForViewCore } from '@/core/roadmaps';
import { requireAuth } from '@/lib/supabase';

import type { NextRequest } from 'next/server';

export async function GET(
  _: NextRequest,
  ctx: RouteContext<'/api/roadmaps/[id]/view'>,
) {
  try {
    const { id } = await ctx.params;

    const { supabase, userId } = await requireAuth();

    const roadmap = await getRoadmapForViewCore(supabase, { id, userId });

    if (!roadmap) {
      return NextResponse.json({ error: 'Roadmap не найден' }, { status: 404 });
    }

    return NextResponse.json(roadmap);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: 'Не удалось загрузить Roadmap' },
      { status: 500 },
    );
  }
}
