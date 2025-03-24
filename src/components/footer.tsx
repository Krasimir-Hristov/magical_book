'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className='w-full border-t border-border/40 bg-gradient-to-b from-background to-background/95'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className='container max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-10 px-4 sm:px-6 lg:px-8'>
        <motion.div
          className='flex flex-col space-y-2'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <div className='flex items-center gap-2 mb-2'>
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <BookOpen className='h-5 w-5' />
            </motion.div>
            <span className='text-sm font-medium'>Вълшебна Книга</span>
          </div>
          <p className='text-sm text-muted-foreground'>
            Платформа за създаване на магически детски книги с помощта на
            изкуствен интелект. Открийте и споделете увлекателни истории,
            създадени специално за децата.
          </p>
        </motion.div>

        <motion.div
          className='flex flex-col space-y-3'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <h3 className='text-sm font-medium'>Полезни връзки</h3>
          <div className='grid grid-cols-2 gap-2'>
            <Link
              href='/'
              className='text-sm text-muted-foreground transition-colors hover:text-foreground'
            >
              Начало
            </Link>
            <Link
              href='/create'
              className='text-sm text-muted-foreground transition-colors hover:text-foreground'
            >
              Създай Книга
            </Link>
            <Link
              href='/library'
              className='text-sm text-muted-foreground transition-colors hover:text-foreground'
            >
              Моята Библиотека
            </Link>
            <Link
              href='/faq'
              className='text-sm text-muted-foreground transition-colors hover:text-foreground'
            >
              ЧЗВ
            </Link>
            <Link
              href='/terms'
              className='text-sm text-muted-foreground transition-colors hover:text-foreground'
            >
              Условия за използване
            </Link>
            <Link
              href='/privacy'
              className='text-sm text-muted-foreground transition-colors hover:text-foreground'
            >
              Поверителност
            </Link>
          </div>
        </motion.div>

        <motion.div
          className='flex flex-col space-y-3'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <h3 className='text-sm font-medium'>Контакти</h3>
          <p className='text-sm text-muted-foreground'>
            Имате въпроси или предложения? Свържете се с нашия екип за
            поддръжка:
          </p>
          <a
            href='mailto:support@magicalbook.com'
            className='text-sm text-indigo-600 hover:text-indigo-800 transition-colors'
          >
            support@magicalbook.com
          </a>
        </motion.div>
      </div>

      <div className='container max-w-screen-xl mx-auto border-t border-border/10 py-6 px-4 sm:px-6 lg:px-8'>
        <motion.p
          className='text-center text-xs text-muted-foreground'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          &copy; {currentYear} Вълшебна Книга. Всички права запазени.
        </motion.p>
      </div>
    </motion.footer>
  );
}
