'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { BooksList } from '@/components/books-list';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function LibraryPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Ако потребителят не е логнат, пренасочваме към login страницата
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  // Показваме loading индикатор на сървъра или докато проверяваме статуса
  if (!isClient || !isLoggedIn) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <motion.div
          className='h-12 w-12 border-b-2 border-indigo-600 rounded-full'
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  // Ако потребителят е логнат, показваме библиотеката с книги
  return (
    <div className='container mx-auto py-8 px-4'>
      <motion.h1
        className='text-3xl font-bold mb-4 text-center text-indigo-900'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Моята Библиотека
      </motion.h1>

      <motion.p
        className='text-center text-muted-foreground mb-8 max-w-2xl mx-auto'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Тук можете да управлявате всички ваши книги - четете, споделяйте или
        изтривайте ги
      </motion.p>

      <motion.div
        className='max-w-6xl mx-auto'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <BooksList showDeleteButton={true} />
      </motion.div>
    </div>
  );
}
