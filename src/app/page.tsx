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

export default function Home() {
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
