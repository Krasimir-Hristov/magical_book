import { createServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get('code');

  // Проверяваме дали имаме код от OAuth доставчика
  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient();

    // Обработка на OAuth callback и създаване на сесия
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Пренасочване към началната страница след автентикация
  return NextResponse.redirect(new URL('/', req.url));
}
