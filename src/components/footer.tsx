import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className='w-full border-t border-border/40 bg-background'>
      <div className='container max-w-screen-xl mx-auto flex flex-col items-center justify-between gap-4 py-8 md:py-6 px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center gap-2 mb-4 md:mb-0'>
          <BookOpen className='h-5 w-5' />
          <span className='text-sm font-medium'>Вълшебна Книга</span>
        </div>
        <div className='flex flex-wrap justify-center gap-4 md:gap-6'>
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
            href='/account'
            className='text-sm text-muted-foreground transition-colors hover:text-foreground'
          >
            Моят Акаунт
          </Link>
        </div>
        <p className='text-center text-xs text-muted-foreground mt-4 md:mt-0'>
          &copy; {new Date().getFullYear()} Вълшебна Книга. Всички права
          запазени.
        </p>
      </div>
    </footer>
  );
}
