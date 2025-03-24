'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Sparkles,
  Clock,
  DownloadCloud,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MagicalDecorations } from '@/components/ui/decorations';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Sparkles className='h-10 w-10 text-white' />,
      title: '1. Въвеждане на параметри',
      description:
        'Въведете тема, заглавие, възрастова група и стил на корицата за вашата нова книга.',
      image: '/how-it-works-1.webp', // Placeholder image
    },
    {
      icon: <Clock className='h-10 w-10 text-white' />,
      title: '2. Генериране на книга',
      description:
        'Нашият изкуствен интелект създава уникална история, базирана на зададените от вас параметри.',
      image: '/how-it-works-2.webp', // Placeholder image
    },
    {
      icon: <BookOpen className='h-10 w-10 text-white' />,
      title: '3. Четене',
      description:
        'Прочетете генерираната книга онлайн, където и когато пожелаете.',
      image: '/how-it-works-3.webp', // Placeholder image
    },
    {
      icon: <DownloadCloud className='h-10 w-10 text-white' />,
      title: '4. Изтегляне и споделяне',
      description:
        'Изтеглете вашата книга като PDF или я споделете директно с приятели и семейство.',
      image: '/how-it-works-4.webp', // Placeholder image
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-b from-indigo-50/80 to-white relative pb-20'>
      {/* Декоративни елементи */}
      <div className='absolute inset-0 overflow-hidden opacity-10 pointer-events-none'>
        <MagicalDecorations />
      </div>

      {/* Хедър */}
      <div className='relative bg-gradient-to-r from-indigo-600 to-violet-700 text-white py-20'>
        <div className='absolute inset-0 opacity-20'>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>

        <div className='container mx-auto px-4 relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col items-center text-center max-w-3xl mx-auto'
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, 0] }}
              transition={{ duration: 0.6 }}
              className='mb-6'
            >
              <BookOpen className='h-20 w-20' />
            </motion.div>

            <motion.h1
              className='text-4xl md:text-5xl font-bold mb-6'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Как Работи Вълшебна Книга
            </motion.h1>

            <motion.p
              className='text-xl text-indigo-100 mb-8 max-w-2xl mx-auto'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Открийте как нашата AI платформа превръща вашите идеи в красиви
              детски книги само за няколко минути
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                className='bg-white text-indigo-700 hover:bg-indigo-50'
              >
                <Link href='/'>
                  <ArrowLeft className='mr-2 h-4 w-4' />
                  Назад към Началната страница
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Декоративни вълни */}
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

      {/* Съдържание - Стъпки на процеса */}
      <div className='container mx-auto px-4 py-16 relative z-10'>
        <div className='space-y-24 max-w-5xl mx-auto'>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-8 md:gap-16 items-center`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              {/* Изображение */}
              <motion.div
                className='w-full md:w-1/2 overflow-hidden rounded-xl shadow-lg'
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div className='bg-gradient-to-r from-indigo-500 to-purple-600 h-64 md:h-80 flex items-center justify-center'>
                  {step.icon}
                  <span className='text-white text-lg ml-2'>
                    {/* Заместител за изображения */}
                    {`Стъпка ${index + 1}`}
                  </span>
                </div>
              </motion.div>

              {/* Текст */}
              <div className='w-full md:w-1/2'>
                <motion.div
                  className='p-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full w-16 h-16 flex items-center justify-center mb-6'
                  initial={{ rotate: -10, scale: 0.9 }}
                  whileInView={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {step.icon}
                </motion.div>

                <motion.h3
                  className='text-2xl font-bold mb-4 text-indigo-900'
                  initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {step.title}
                </motion.h3>

                <motion.p
                  className='text-lg text-muted-foreground'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {step.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA секция */}
      <motion.div
        className='bg-gradient-to-r from-indigo-600 to-violet-700 text-white py-20 mt-16 relative'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className='container mx-auto px-4 max-w-3xl text-center relative z-10'>
          <motion.h2
            className='text-3xl md:text-4xl font-bold mb-6'
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Готови ли сте да създадете вашата първа магическа книга?
          </motion.h2>

          <motion.p
            className='text-xl text-indigo-100 mb-8'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Започнете процеса на създаване сега и получете 3 безплатни кредита
            за генериране на вашите първи вълшебни книги!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              size='lg'
              className='bg-white text-indigo-700 hover:bg-indigo-50 shadow-xl'
            >
              <Link href='/create'>
                <Sparkles className='mr-2 h-4 w-4' />
                Създай Своята Книга
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className='absolute inset-0 opacity-20'>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>
      </motion.div>

      {/* FAQ секция */}
      <div className='container mx-auto px-4 py-20 relative z-10'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className='text-3xl font-bold mb-4 text-indigo-900'>
            Често Задавани Въпроси
          </h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            Открийте отговори на най-често задаваните въпроси за нашата
            платформа
          </p>
        </motion.div>

        <div className='max-w-3xl mx-auto space-y-6'>
          {[
            {
              question: 'Колко струва използването на платформата?',
              answer:
                'Всеки нов потребител получава 3 безплатни кредита за генериране на книги. След изчерпването им, трябва да закупите допълнителни токени - всеки токен е достатъчен за генериране на една книга.',
            },
            {
              question: 'Как мога да закупя допълнителни токени?',
              answer:
                'След изчерпване на вашите 3 безплатни кредита, можете да закупите допълнителни токени от секцията "Профил" в приложението. Предлагаме различни пакети токени с отстъпки при по-големи количества.',
            },
            {
              question: 'Мога ли да редактирам историята след генерирането?',
              answer:
                'Не, след като AI генерира книгата, тя не може да бъде редактирана. Това е за да се запази целостта на генерираното съдържание. Ако искате различен резултат, най-добре е да създадете нова книга с различни параметри.',
            },
            {
              question: 'Какви възрастови групи поддържа платформата?',
              answer:
                'Нашата платформа позволява създаването на книги за деца от различни възрастови групи - от 2-4 години, 5-7 години, до 8-12 години.',
            },
            {
              question: 'Мога ли да споделя създадените книги?',
              answer:
                'Да, можете да изтеглите книгите като PDF файлове или да ги споделите директно чрез линк с вашето семейство и приятели.',
            },
            {
              question: 'Как мога да персонализирам моята книга?',
              answer:
                'Персонализацията се извършва в първата стъпка от процеса - чрез избор на тема, заглавие, възрастова група и стил на корицата. След генериране книгата не може да бъде редактирана, затова е важно да изберете правилните параметри в началото.',
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              className='bg-white rounded-xl shadow-md overflow-hidden'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className='p-6'>
                <h3 className='text-xl font-semibold mb-3 text-indigo-900'>
                  {faq.question}
                </h3>
                <p className='text-muted-foreground'>{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
