'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function ErrorPage({
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
    <div className='h-screen flex flex-col items-center justify-center p-4'>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='max-w-md text-center'
      >
        <h1 className='text-4xl font-bold text-red-600 mb-4'>
          Възникна грешка!
        </h1>
        <p className='text-muted-foreground mb-8'>
          За съжаление, нещо се обърка. Моля, опитайте отново или се върнете към
          началната страница.
        </p>
        <motion.div
          className='flex flex-col sm:flex-row justify-center gap-4'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Button onClick={reset} className='bg-indigo-600 hover:bg-indigo-700'>
            Опитай отново
          </Button>
          <Button
            variant='outline'
            onClick={() => (window.location.href = '/')}
          >
            Начало
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
