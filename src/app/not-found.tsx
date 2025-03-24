'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-indigo-50 to-white'>
      <motion.div
        className='max-w-md text-center'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          className='inline-block mb-6'
        >
          <BookOpen className='h-24 w-24 text-indigo-600 mx-auto' />
        </motion.div>

        <motion.h1
          className='text-4xl font-bold text-indigo-900 mb-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          404 - Страницата не е намерена
        </motion.h1>

        <motion.p
          className='text-muted-foreground mb-8 text-lg'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Съжаляваме, но страницата, която търсите, не съществува или е
          преместена.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button asChild className='bg-indigo-600 hover:bg-indigo-700'>
            <Link href='/'>Връщане към началната страница</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
