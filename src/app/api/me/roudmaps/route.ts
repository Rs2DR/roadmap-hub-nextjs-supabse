import { NextResponse } from 'next/server';

import { getMyRoadmapsInfoCore } from '@/dal/core/roadmaps';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createServerSupabase();

    const { data } = await supabase.auth.getClaims();

    if (!data)
      return NextResponse.json(
        { error: 'Пользователь не авторизован' },
        { status: 401 },
      );

    const {
      claims: { sub: userId },
    } = data;

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
