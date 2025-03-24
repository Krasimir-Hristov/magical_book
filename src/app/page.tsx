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
    coverUrl: '/placeholder-book-cover-1.jpg',
    createdAt: '15.03.2024',
    ageRange: '5-7',
    authorName: 'Мария Петрова',
  },
  {
    id: '2',
    title: 'Тайната на Океана',
    coverUrl: '/placeholder-book-cover-2.jpg',
    createdAt: '14.03.2024',
    ageRange: '8-12',
    authorName: 'Иван Иванов',
  },
  {
    id: '3',
    title: 'Приятелите в Градината',
    coverUrl: '/placeholder-book-cover-3.jpg',
    createdAt: '13.03.2024',
    ageRange: '2-4',
    authorName: 'Петър Димитров',
  },
  {
    id: '4',
    title: 'Вълшебната Книга с Приключения',
    coverUrl: '/placeholder-book-cover-1.jpg',
    createdAt: '12.03.2024',
    ageRange: '5-7',
    authorName: 'Анна Стоянова',
  },
  {
    id: '5',
    title: 'Пътешествие в Космоса',
    coverUrl: '/placeholder-book-cover-2.jpg',
    createdAt: '11.03.2024',
    ageRange: '8-12',
    authorName: 'Георги Николов',
  },
  {
    id: '6',
    title: 'Приятелите в Детската Градина',
    coverUrl: '/placeholder-book-cover-3.jpg',
    createdAt: '10.03.2024',
    ageRange: '2-4',
    authorName: 'Елена Димитрова',
  },
];

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // За тестване, винаги true
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (isLoggedIn) {
    return (
      <div className='flex flex-col'>
        {/* Hero Section */}
        <section className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl'>
                  Разгледайте Книги от Други Автори
                </h1>
                <p className='max-w-[600px] text-muted-foreground md:text-xl mx-auto'>
                  Открийте вълнуващи истории, създадени от нашата общност от
                  автори.
                </p>
              </div>
              <div className='flex flex-col gap-2 min-[400px]:flex-row items-center justify-center'>
                <Link href='/create'>
                  <Button
                    size='lg'
                    className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  >
                    Създайте Своя Книга
                  </Button>
                </Link>
                <Link href='/library'>
                  <Button size='lg' variant='outline'>
                    Моята Библиотека
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Books Grid Section */}
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {books.map((book) => (
                <Card
                  key={book.id}
                  className='overflow-hidden hover:shadow-lg transition-shadow'
                >
                  <div className='relative h-48'>
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className='text-xl'>{book.title}</CardTitle>
                    <CardDescription className='text-base'>
                      Автор: {book.authorName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='flex justify-between items-center text-sm text-muted-foreground'>
                      <span>Възраст: {book.ageRange}</span>
                      <span>{book.createdAt}</span>
                    </div>
                    <Button className='w-full mt-4' variant='outline' asChild>
                      <Link href={`/read/${book.id}`}>Прочети</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Оригиналната страница за нелогнати потребители
  return (
    <div className='flex flex-col'>
      {/* Hero Section */}
      <section className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800'>
        <div className='container px-4 md:px-6'>
          <div className='grid gap-6 lg:grid-cols-2 lg:gap-12 items-center'>
            <div className='flex flex-col justify-center space-y-4 text-center lg:text-left'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl'>
                  Създайте Магически Детски Книги с AI
                </h1>
                <p className='max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0'>
                  Трансформирайте своите идеи в красиви детски книги за минути с
                  помощта на изкуствен интелект.
                </p>
              </div>
              <div className='flex flex-col gap-2 min-[400px]:flex-row items-center justify-center'>
                <Link href='/create'>
                  <Button
                    size='lg'
                    className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  >
                    Започни Сега
                  </Button>
                </Link>
                <Link href='/library'>
                  <Button size='lg' variant='outline'>
                    Разгледай Примери
                  </Button>
                </Link>
              </div>
            </div>
            <div className='mx-auto lg:mr-0 relative'>
              <div className='relative w-full max-w-[500px] h-[350px] bg-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-900 dark:to-purple-900 rounded-2xl shadow-lg overflow-hidden'>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <BookOpen className='h-24 w-24 text-indigo-600 dark:text-indigo-200' />
                </div>
                <div className='absolute bottom-0 w-full p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur'>
                  <h3 className='font-medium'>Магическото Пътешествие</h3>
                  <p className='text-sm text-muted-foreground'>
                    Създадено с AI за възраст 5-7 години
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='w-full py-12 md:py-24 lg:py-32'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
                Как Работи
              </h2>
              <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed'>
                Нашата платформа използва последните технологии в изкуствения
                интелект, за да превърне вашите идеи в персонализирани детски
                истории.
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
                  <CardTitle className='text-center'>{feature.title}</CardTitle>
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
              <Link href='/create'>
                <Button
                  size='lg'
                  className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                >
                  Създай Книга Сега
                </Button>
              </Link>
              <Link href='/account'>
                <Button size='lg' variant='outline'>
                  <CreditCard className='mr-2 h-4 w-4' />
                  Купи Токени
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
