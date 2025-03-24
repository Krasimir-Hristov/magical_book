'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function Loading() {
  return (
    <div className='h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-indigo-50 to-white'>
      <motion.div
        className='flex flex-col items-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className='mb-6'
        >
          <BookOpen className='h-16 w-16 text-indigo-600' />
        </motion.div>

        <motion.h3
          className='text-xl font-medium text-indigo-900 mb-4'
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Зареждане...
        </motion.h3>

        <div className='w-48 h-2 bg-indigo-100 rounded-full overflow-hidden'>
          <motion.div
            className='h-full bg-indigo-600 rounded-full'
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}
