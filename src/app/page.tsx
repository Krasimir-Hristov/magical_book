'use client';

import Link from 'next/link';
import { BookOpen, Sparkles, Clock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FloatingBooks, MagicalDecorations } from '@/components/ui/decorations';
import { BooksList } from '@/components/books-list';

interface Book {
  id: string;
  title: string;
  coverUrl: string;
  createdAt: string;
  ageRange: string;
  authorName: string;
}

// Dummy данни за тестване
const dummyBooks: Book[] = [
  {
    id: '1',
    title: 'Приключенията на Малкия Космонавт',
    coverUrl: '/aiavatar.png',
    createdAt: '15.03.2024',
    ageRange: '5-7',
    authorName: 'Мария Петрова',
  },
  {
    id: '2',
    title: 'Тайната на Океана',
    coverUrl: '/aiavatar.png',
    createdAt: '14.03.2024',
    ageRange: '8-12',
    authorName: 'Иван Иванов',
  },
  {
    id: '3',
    title: 'Приятелите в Градината',
    coverUrl: '/aiavatar.png',
    createdAt: '13.03.2024',
    ageRange: '2-4',
    authorName: 'Петър Димитров',
  },
  {
    id: '4',
    title: 'Вълшебната Книга с Приключения',
    coverUrl: '/aiavatar.png',
    createdAt: '12.03.2024',
    ageRange: '5-7',
    authorName: 'Анна Стоянова',
  },
  {
    id: '5',
    title: 'Пътешествие в Космоса',
    coverUrl: '/aiavatar.png',
    createdAt: '11.03.2024',
    ageRange: '8-12',
    authorName: 'Георги Николов',
  },
  {
    id: '6',
    title: 'Приятелите в Детската Градина',
    coverUrl: '/aiavatar.png',
    createdAt: '10.03.2024',
    ageRange: '2-4',
    authorName: 'Елена Димитрова',
  },
];

// Статистики за приложението
const stats = {
  totalBooks: '1500+',
  totalCreators: '350+',
  avgCreationTime: '5 мин.',
};

export default function Home() {
  const { isLoggedIn } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleProtectedRoute = (path: string) => {
    if (isLoggedIn) {
      router.push(path);
    } else {
      router.push('/login');
    }
  };

  const handleReadBook = (bookId: string) => {
    if (isLoggedIn) {
      router.push(`/read/${bookId}`);
    } else {
      router.push('/login');
    }
  };

  useEffect(() => {
    // Симулираме зареждане на данни
    const loadData = async () => {
      try {
        // Симулираме забавяне
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setBooks(dummyBooks);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
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

  return (
    <div className='relative'>
      {/* Hero section */}
      <section className='relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-indigo-600 to-violet-800'>
        <div className='absolute inset-0 z-0 opacity-30'>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>
        <MagicalDecorations />

        <div className='container relative z-10 mx-auto px-4'>
          <div className='grid gap-12 md:grid-cols-2 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <h1 className='text-4xl md:text-6xl font-bold mb-6 text-white font-fancy'>
                Създайте Магически Детски Книги с AI
              </h1>
              <p className='text-xl md:text-2xl mb-8 text-purple-50'>
                Превърнете вашите идеи в красиви, интерактивни детски книги само
                за няколко минути.
              </p>
              <motion.div
                className='flex flex-col sm:flex-row gap-4'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size='lg'
                    className='bg-white text-purple-700 hover:bg-purple-50 shadow-lg'
                    onClick={() => handleProtectedRoute('/create')}
                  >
                    Създай Книга
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant='outline'
                    size='lg'
                    className='bg-transparent border-white text-white hover:bg-white/10'
                  >
                    <Link href='/how-it-works'>Научи Повече</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className='relative'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className='relative mx-auto max-w-md'>
                <motion.div
                  className='absolute -top-6 -left-8 w-28 h-36 rounded-lg shadow-xl z-10 bg-white p-1 transform -rotate-6'
                  animate={{ rotate: [-6, -4, -6], y: [0, -5, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <img
                    src='/aiavatar.png'
                    alt='Book Cover'
                    className='w-full h-full object-cover rounded-md'
                  />
                </motion.div>

                <motion.div
                  className='absolute -bottom-4 -right-8 w-32 h-36 rounded-lg shadow-xl z-10 bg-white p-1 transform rotate-6'
                  animate={{ rotate: [6, 4, 6], y: [0, 5, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                >
                  <img
                    src='/aiavatar.png'
                    alt='Book Cover'
                    className='w-full h-full object-cover rounded-md'
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Статистики */}
      <motion.section
        className='py-16 bg-gradient-to-r from-indigo-50 to-purple-50 relative'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className='container mx-auto max-w-5xl px-4'>
          <h2 className='text-3xl font-bold text-center mb-12 text-indigo-900'>
            Нашата AI Платформа в Числа
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {Object.entries(stats).map(
              ([key, value]: [string, string], index) => (
                <motion.div
                  key={key}
                  className='bg-white flex flex-col items-center p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 5, 0] }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className='mb-4'
                  >
                    {index === 0 && (
                      <BookOpen className='h-10 w-10 text-indigo-600' />
                    )}
                    {index === 1 && (
                      <Sparkles className='h-10 w-10 text-indigo-600' />
                    )}
                    {index === 2 && (
                      <Clock className='h-10 w-10 text-indigo-600' />
                    )}
                  </motion.div>
                  <h3 className='text-xl font-semibold mb-1 text-center'>
                    {key === 'totalBooks' && 'Създадени Книги'}
                    {key === 'totalCreators' && 'Активни Създатели'}
                    {key === 'avgCreationTime' && 'Средно Време за Създаване'}
                  </h3>
                  <p className='text-3xl font-bold text-indigo-600'>{value}</p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </motion.section>

      {/* Книги */}
      <section className='py-16 bg-gradient-to-b from-background to-indigo-50/25'>
        <div className='container mx-auto max-w-5xl px-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mb-12 text-center'
          >
            <h2 className='text-3xl font-bold mb-4 text-indigo-900'>
              {isLoggedIn
                ? 'Книги от нашата общност'
                : 'Популярни детски книги'}
            </h2>
            <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
              Разгледайте селекция от въображаеми истории, създадени с нашата AI
              платформа.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <BooksList books={books} showDeleteButton={false} />
          </motion.div>
        </div>
      </section>

      {/* Как работи */}
      <motion.section
        className='py-20 bg-gradient-to-b from-indigo-50/25 to-white relative overflow-hidden'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <FloatingBooks />

        <div className='container mx-auto max-w-5xl px-4 relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='mb-12 text-center'
          >
            <h2 className='text-3xl font-bold mb-4 text-indigo-900'>
              Как Работи Нашата Платформа
            </h2>
            <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
              Създаването на вълшебна детска книга никога не е било толкова
              лесно! Регистрирайте се сега и получете 3 безплатни кредита.
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                icon: <Sparkles className='h-10 w-10 text-indigo-600' />,
                title: 'Въвеждане на параметри',
                description:
                  'Въведете тема, заглавие, възрастова група и стил на корицата за вашата нова книга.',
              },
              {
                icon: <Clock className='h-10 w-10 text-indigo-600' />,
                title: 'Генериране на книга',
                description:
                  'Нашият AI ще създаде уникална книга, базирана на зададените от вас параметри.',
              },
              {
                icon: <BookOpen className='h-10 w-10 text-indigo-600' />,
                title: 'Четене и споделяне',
                description:
                  'Четете книгата онлайн, изтеглете я като PDF или я споделете с близките.',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className='bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className='h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center mb-6'
                  whileHover={{ rotate: 10, scale: 1.05 }}
                >
                  {step.icon}
                </motion.div>
                <h3 className='text-xl font-semibold mb-3'>{step.title}</h3>
                <p className='text-muted-foreground'>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className='py-16 bg-gradient-to-r from-indigo-600 to-violet-700 text-white'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className='container mx-auto max-w-3xl px-4 text-center'>
          <motion.h2
            className='text-3xl md:text-4xl font-bold mb-6'
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Готови ли сте да създадете вашата първа книга?
          </motion.h2>

          <motion.p
            className='text-xl text-indigo-100 mb-8'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Регистрирайте се сега, получете 3 безплатни кредита и започнете да
            създавате вълшебни истории за вашите деца.
          </motion.p>

          <motion.div
            className='flex flex-col sm:flex-row gap-4 justify-center'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size='lg'
                className='bg-white text-indigo-700 hover:bg-indigo-50'
                onClick={() => handleProtectedRoute('/create')}
              >
                Започни Сега
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant='outline'
                size='lg'
                className='border-white text-black hover:bg-white/10'
                asChild
              >
                <Link href='/how-it-works'>
                  <CreditCard className='mr-2 h-4 w-4 ' />
                  Научи Повече
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
