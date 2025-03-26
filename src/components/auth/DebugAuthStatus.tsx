'use client';

import { useEffect, useState } from 'react';
import { createClientSide } from '@/lib/supabase/client';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';

export function DebugAuthStatus() {
  const { isLoggedIn, userName, userAvatar, user, logout } = useAuth();
  const [cookies, setCookies] = useState<string[]>([]);
  const supabase = createClientSide();

  useEffect(() => {
    // Функция за показване на всички бисквитки (сесийни)
    // Това ще покаже само имената, не и стойностите на HTTP-Only бисквитките
    const getCookieNames = () => {
      const cookieNames = document.cookie
        .split(';')
        .map((cookie) => cookie.trim().split('=')[0]);
      setCookies(cookieNames);
    };

    getCookieNames();
  }, []);

  const checkSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    console.log('Текуща сесия:', data.session);
    if (error) {
      console.error('Грешка при проверка на сесията:', error);
    }
  };

  return (
    <div className='p-4 border rounded-lg bg-gray-50 my-4'>
      <h2 className='text-lg font-bold mb-2'>
        Дебъг информация за автентикация
      </h2>

      <div className='grid gap-2'>
        <div>
          <strong>Статус:</strong>{' '}
          {isLoggedIn ? '✅ Влезли сте' : '❌ Не сте влезли'}
        </div>
        {isLoggedIn && (
          <>
            <div>
              <strong>Име:</strong> {userName}
            </div>
            <div>
              <strong>Email:</strong> {user?.email}
            </div>
            <div>
              <strong>Аватар URL:</strong> {userAvatar}
            </div>
            <div>
              <strong>User ID:</strong> {user?.id}
            </div>
          </>
        )}

        <div className='mt-2'>
          <strong>Сесийни бисквитки:</strong>
          {cookies.length > 0 ? (
            <ul className='list-disc pl-5'>
              {cookies.map((cookie) => (
                <li key={cookie}>{cookie}</li>
              ))}
            </ul>
          ) : (
            <p>Няма намерени бисквитки</p>
          )}
        </div>

        <div className='flex space-x-2 mt-2'>
          <Button onClick={checkSession} variant='outline' size='sm'>
            Провери сесия в конзола
          </Button>
          {isLoggedIn && (
            <Button onClick={logout} variant='outline' size='sm'>
              Излез
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
