import { NextResponse } from 'next/server';
import z from 'zod';

import { getPublicRoadmapsCore } from '@/core/roadmaps';
import { requireAuth } from '@/lib/supabase';
import { GetPublicRoadmapsSchema } from '@/shcemas/GetPublicRoadmapsSchema';

import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { supabase, userId } = await requireAuth();

    const searchParams = request.nextUrl.searchParams;
    const rawParams = {
      search: searchParams.get('search') || undefined,
      orderBy: searchParams.get('orderBy') || undefined,
      userId,
    };

    const parsedParams = GetPublicRoadmapsSchema.parse(rawParams);

    const roadmaps = await getPublicRoadmapsCore(supabase, parsedParams);

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
