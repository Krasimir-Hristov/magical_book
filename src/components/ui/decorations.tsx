'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

// Компонент за плаващи книги като декоративен елемент
export function FloatingBooks() {
  return (
    <div className='absolute inset-0 overflow-hidden z-0 opacity-70'>
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className='absolute'
          initial={{
            x: Math.random() * 100 - 50 + '%',
            y: Math.random() * 100 + '%',
            rotate: Math.random() * 20 - 10,
            opacity: 0.1,
          }}
          animate={{
            y: [
              Math.random() * 100 + '%',
              Math.random() * 70 + '%',
              Math.random() * 100 + '%',
            ],
            rotate: [
              Math.random() * 20 - 10,
              Math.random() * 20 - 10,
              Math.random() * 20 - 10,
            ],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            left: i % 2 === 0 ? '10%' : '80%',
          }}
        >
          <div
            className='bg-white rounded-md p-1 shadow-xl'
            style={{ width: `${80 + Math.random() * 40}px` }}
          >
            <BookOpen className='w-full h-full text-indigo-600' />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Компонент за магически декорации на фона
export function MagicalDecorations() {
  return (
    <div className='absolute inset-0 overflow-hidden z-0 opacity-20'>
      {/* Градиентни кръгове */}
      <motion.div
        className='absolute w-72 h-72 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 blur-3xl'
        style={{ top: '10%', left: '10%' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className='absolute w-80 h-80 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 blur-3xl'
        style={{ bottom: '10%', right: '10%' }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Светещи звезди */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className='absolute bg-white rounded-full'
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}
