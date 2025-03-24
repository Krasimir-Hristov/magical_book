import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className='w-full border-t border-border/40 bg-background'>
      <div className='container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0'>
        <div className='flex items-center gap-2'>
          <BookOpen className='h-5 w-5' />
          <span className='text-sm font-medium'>Вълшебна Книга</span>
        </div>
        <div className='flex flex-col gap-4 md:flex-row md:gap-6'>
          <Link
            href='/'
            className='text-xs text-muted-foreground transition-colors hover:text-foreground'
          >
            Начало
          </Link>
          <Link
            href='/create'
            className='text-xs text-muted-foreground transition-colors hover:text-foreground'
          >
            Създай Книга
          </Link>
          <Link
            href='/library'
            className='text-xs text-muted-foreground transition-colors hover:text-foreground'
          >
            Моята Библиотека
          </Link>
          <Link
            href='/account'
            className='text-xs text-muted-foreground transition-colors hover:text-foreground'
          >
            Моят Акаунт
          </Link>
        </div>
        <p className='text-center text-xs text-muted-foreground md:text-right'>
          &copy; {new Date().getFullYear()} Вълшебна Книга. Всички права
          запазени.
        </p>
      </div>
    </footer>
  );
}
