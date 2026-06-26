import { NextResponse } from 'next/server';

import { getMyRoadmapsInfoCore } from '@/core/roadmaps';
import { requireAuth } from '@/lib/supabase';

export async function GET() {
  try {
    const { supabase, userId } = await requireAuth();

    const roadmaps = await getMyRoadmapsInfoCore(supabase, {
      userId,
    });

    return NextResponse.json(roadmaps);
  } catch {
    return NextResponse.json(
      { error: 'Не удалось загрузить roadmaps' },
      { status: 500 },
    );
  }
}
