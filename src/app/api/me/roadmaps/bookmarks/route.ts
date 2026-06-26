import { NextResponse } from 'next/server';
import z from 'zod';

import { getBookmarkedRoadmapsCore } from '@/core/roadmaps';
import { requireAuth } from '@/lib/supabase';

import type { NextRequest } from 'next/server';

export async function GET(_: NextRequest) {
  try {
    const { supabase, userId } = await requireAuth();

    const roadmaps = await getBookmarkedRoadmapsCore(supabase, { userId });

    return NextResponse.json(roadmaps);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Некорректные параметры запроса',
          details: z.treeifyError(error),
        },
        { status: 400 },
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : 'Внутренняя ошибка сервера';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
