'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Тук можем да записваме грешката в система за наблюдение
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className='h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-indigo-50 to-white'>
          <div className='max-w-md text-center'>
            <h1 className='text-4xl font-bold text-red-600 mb-4'>
              Критична грешка!
            </h1>
            <p className='text-muted-foreground mb-8'>
              За съжаление, приложението срещна критична грешка. Моля, опитайте
              да презаредите страницата.
            </p>
            <div className='flex flex-col sm:flex-row justify-center gap-4'>
              <Button
                onClick={reset}
                className='bg-indigo-600 hover:bg-indigo-700 text-white'
              >
                Опитай отново
              </Button>
              <Button
                variant='outline'
                onClick={() => (window.location.href = '/')}
              >
                Начало
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
