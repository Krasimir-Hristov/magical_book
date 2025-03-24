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
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
      </div>
    );
  }

  return (
    <div className='flex flex-col'>
      {/* Hero Section */}
      <section className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl'>
                {isLoggedIn
                  ? 'Разгледайте Книги от Други Автори'
                  : 'Създайте Магически Детски Книги с AI'}
              </h1>
              <p className='max-w-[600px] text-muted-foreground md:text-xl mx-auto'>
                {isLoggedIn
                  ? 'Открийте вълнуващи истории, създадени от нашата общност от автори.'
                  : 'Трансформирайте своите идеи в красиви детски книги за минути с помощта на изкуствен интелект.'}
              </p>
            </div>
            <div className='flex flex-col gap-2 min-[400px]:flex-row items-center justify-center'>
              <Button
                size='lg'
                className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                onClick={() => handleProtectedRoute('/create')}
              >
                {isLoggedIn ? 'Създайте Своя Книга' : 'Започни Сега'}
              </Button>
              <Button
                size='lg'
                variant='outline'
                onClick={() => handleProtectedRoute('/library')}
              >
                {isLoggedIn ? 'Моята Библиотека' : 'Регистрирай се'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid Section */}
      <section className='w-full py-12 md:py-24 lg:py-32'>
        <div className='container px-4 md:px-6'>
          <h2 className='text-2xl md:text-3xl font-bold text-center mb-8'>
            {isLoggedIn
              ? 'Книги от нашата общност'
              : 'Популярни книги от нашата платформа'}
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {books.map((book) => (
              <div
                key={book.id}
                className='bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden'
                style={{
                  height: '400px',
                  display: 'grid',
                  gridTemplateRows: 'auto auto 1fr auto',
                }}
              >
                {/* Изображение - фиксирана височина */}
                <div style={{ height: '160px' }}>
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>

                {/* Заглавие и дата - фиксирана височина */}
                <div className='p-4 pb-2'>
                  <h3 className='text-lg font-semibold truncate'>
                    {book.title}
                  </h3>
                  <p className='text-sm text-gray-500'>
                    Автор: {book.authorName}
                  </p>
                </div>

                {/* Допълнителна информация - раздел с разширяемо съдържание */}
                <div className='p-4 pt-0 overflow-hidden'>
                  <div className='flex justify-between items-center text-sm text-gray-500'>
                    <span>Възраст: {book.ageRange}</span>
                    <span>{book.createdAt}</span>
                  </div>
                </div>

                {/* Бутони - фиксирана височина в долната част */}
                <div className='p-4 border-t'>
                  <Button
                    className='w-full'
                    variant='outline'
                    onClick={() => handleReadBook(book.id)}
                  >
                    {isLoggedIn ? 'Прочети' : 'Влез за да четеш'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!isLoggedIn && (
        <>
          {/* Features Section */}
          <section className='w-full py-12 md:py-24 lg:py-32'>
            <div className='container px-4 md:px-6'>
              <div className='flex flex-col items-center justify-center space-y-4 text-center'>
                <div className='space-y-2'>
                  <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
                    Как Работи
                  </h2>
                  <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed'>
                    Нашата платформа използва последните технологии в
                    изкуствения интелект, за да превърне вашите идеи в
                    персонализирани детски истории.
                  </p>
                </div>
              </div>
              <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12'>
                {[
                  {
                    icon: (
                      <Sparkles className='h-10 w-10 text-indigo-600 dark:text-indigo-400' />
                    ),
                    title: 'Създайте История',
                    description:
                      'Въведете творческа идея, изберете възрастовата група и стила на книгата.',
                  },
                  {
                    icon: (
                      <Clock className='h-10 w-10 text-indigo-600 dark:text-indigo-400' />
                    ),
                    title: 'Изчакайте Генерирането',
                    description:
                      'Нашият AI ще създаде увлекателна история и красиви илюстрации само за няколко минути.',
                  },
                  {
                    icon: (
                      <BookOpen className='h-10 w-10 text-indigo-600 dark:text-indigo-400' />
                    ),
                    title: 'Получете Книгата',
                    description:
                      'Прегледайте, редактирайте и изтеглете вашата персонализирана книга или я споделете с близките.',
                  },
                ].map((feature, index) => (
                  <Card
                    key={index}
                    className='flex flex-col items-center text-center'
                  >
                    <CardHeader className='flex flex-col items-center w-full'>
                      <div className='flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/20 mb-4 mx-auto'>
                        {feature.icon}
                      </div>
                      <CardTitle className='text-center'>
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950'>
            <div className='container px-4 md:px-6'>
              <div className='flex flex-col items-center justify-center space-y-4 text-center'>
                <div className='space-y-2'>
                  <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
                    Готови ли сте да започнете?
                  </h2>
                  <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed'>
                    Превърнете въображението си в красиви детски книги още днес.
                  </p>
                </div>
                <div className='flex flex-col gap-2 min-[400px]:flex-row items-center justify-center'>
                  <Button
                    size='lg'
                    className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    onClick={() => router.push('/login')}
                  >
                    Създай Книга Сега
                  </Button>
                  <Button
                    size='lg'
                    variant='outline'
                    onClick={() => router.push('/login')}
                  >
                    <CreditCard className='mr-2 h-4 w-4' />
                    Купи Токени
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
