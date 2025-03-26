'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Starting auth callback handling...');

        // Първо проверяваме URL-а за грешки
        const url = new URL(window.location.href);
        const errorParam = url.searchParams.get('error');
        const errorDescription = url.searchParams.get('error_description');

        if (errorParam) {
          console.error('Auth error:', errorParam, errorDescription);
          router.replace('/');
          return;
        }

        // Изчакваме малко преди да проверим сесията
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Проверяваме сесията
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        console.log('Session check result:', { session, error });

        if (error) {
          console.error('Session error:', error);
          router.replace('/');
          return;
        }

        if (session) {
          console.log('User authenticated:', session.user);
          router.replace('/');
        } else {
          console.log('No session found');
          router.replace('/');
        }
      } catch (error) {
        console.error('Callback error:', error);
        router.replace('/');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='text-center'>
        <h2 className='text-2xl font-semibold mb-4'>
          Обработка на автентикацията...
        </h2>
        <p>Моля изчакайте...</p>
      </div>
    </div>
  );
}
