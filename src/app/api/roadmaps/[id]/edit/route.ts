import { NextResponse } from 'next/server';

import { getRoadmapForEditCore } from '@/core/roadmaps';
import { createServerSupabase } from '@/lib/supabase/server';

import type { NextRequest } from 'next/server';

export async function GET(
  _: NextRequest,
  ctx: RouteContext<'/api/roadmaps/[id]/edit'>,
) {
  try {
    const { id } = await ctx.params;

    const supabase = await createServerSupabase();

    const roadmap = await getRoadmapForEditCore(supabase, { id });

    if (!roadmap) {
      return NextResponse.json({ error: 'Roadmap не найден' }, { status: 404 });
    }

    return NextResponse.json(roadmap);
  } catch {
    return NextResponse.json(
      { error: 'Не удалось загрузить Roadmap' },
      { status: 500 },
    );
  }
}
