'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { BooksList } from '@/components/books-list';
import { motion } from 'framer-motion';
import { BookOpen, LibraryBig, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FloatingBooks, MagicalDecorations } from '@/components/ui/decorations';

export default function LibraryPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
      <div className='flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-white'>
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
            <LibraryBig className='h-16 w-16 text-indigo-600' />
          </motion.div>

          <motion.h3
            className='text-xl font-medium text-indigo-900 mb-4'
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Зареждане на библиотеката...
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

  // Ако потребителят е логнат, показваме библиотеката с книги
  return (
    <div className='min-h-screen bg-gradient-to-b from-indigo-50/80 to-white relative'>
      {/* Декоративни елементи */}
      <div className='absolute inset-0 overflow-hidden opacity-10 pointer-events-none'>
        <MagicalDecorations />
      </div>

      {/* Хедър на библиотеката */}
      <div className='relative bg-gradient-to-r from-indigo-600 to-violet-700 text-white py-12 mb-8'>
        <div className='absolute inset-0 opacity-20'>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>

        <div className='container mx-auto px-4 relative z-10'>
          <motion.div
            className='flex flex-col items-center'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 5, 0] }}
              transition={{ duration: 0.6 }}
              className='mb-4'
            >
              <LibraryBig className='h-16 w-16' />
            </motion.div>

            <motion.h1
              className='text-4xl md:text-5xl font-bold mb-4 text-center'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Моята Библиотека
            </motion.h1>

            <motion.p
              className='text-center text-indigo-100 mb-8 max-w-2xl mx-auto text-lg'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Управлявайте вашите магически детски книги, създадени с помощта на
              AI
            </motion.p>

            {/* Лента за търсене и бутон за добавяне */}
            <motion.div
              className='flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className='relative flex-1'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Search className='h-5 w-5 text-indigo-200' />
                </div>
                <input
                  type='text'
                  placeholder='Търсене на книги...'
                  className='block w-full pl-10 pr-3 py-2 rounded-md bg-white/10 border border-indigo-300/20 focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-indigo-200'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className='bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg'
                  onClick={() => router.push('/create')}
                >
                  <Plus className='mr-2 h-4 w-4' />
                  Нова Книга
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Декоративни вълни в долната част на хедъра */}
        <div className='absolute bottom-0 left-0 right-0 h-16 overflow-hidden'>
          <svg
            viewBox='0 0 1200 120'
            preserveAspectRatio='none'
            className='absolute bottom-0 w-full h-12 text-indigo-50/80 rotate-180'
            fill='currentColor'
          >
            <path d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' />
          </svg>
        </div>
      </div>

      <div className='container mx-auto px-4 pb-16 relative z-10'>
        {/* Фиксиран бутон за бързо създаване на книга в долния десен ъгъл */}
        <motion.div
          className='fixed bottom-8 right-8 z-20'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 1,
          }}
          whileHover={{
            scale: 1.1,
            rotate: 5,
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            size='lg'
            className='rounded-full w-16 h-16 bg-gradient-to-r from-indigo-600 to-violet-700 text-white shadow-lg hover:shadow-xl'
            onClick={() => router.push('/create')}
          >
            <Plus className='h-8 w-8' />
          </Button>
        </motion.div>

        <motion.div
          className='max-w-6xl mx-auto'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <BooksList showDeleteButton={true} />
        </motion.div>
      </div>
    </div>
  );
}
