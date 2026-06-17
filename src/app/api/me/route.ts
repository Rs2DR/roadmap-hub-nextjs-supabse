import { NextResponse } from 'next/server';

import { getUserCore } from '@/dal/core/user';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createServerSupabase();

    const user = await getUserCore(supabase);

    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь не авторизован' },
        { status: 401 },
      );
    }

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: 'Не удалось получить пользователя' },
      { status: 500 },
    );
  }
}
