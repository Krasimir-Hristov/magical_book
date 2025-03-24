'use client';

import Link from 'next/link';
import { BookOpen, Menu, Star, UserCircle, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Отвори меню</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='pr-0'>
        <div className='flex items-center space-x-2'>
          <BookOpen className='h-6 w-6' />
          <span className='font-bold'>Вълшебна Книга</span>
        </div>
        <nav className='mt-8 flex flex-col gap-4'>
          <Link
            href='/'
            className={cn(
              'flex items-center gap-2 text-muted-foreground',
              'px-2 py-1 text-lg'
            )}
            onClick={() => setOpen(false)}
          >
            <Star className='h-5 w-5' />
            <span>Начало</span>
          </Link>
          <Link
            href='/create'
            className={cn(
              'flex items-center gap-2 text-muted-foreground',
              'px-2 py-1 text-lg'
            )}
            onClick={() => setOpen(false)}
          >
            <BookOpen className='h-5 w-5' />
            <span>Създай Книга</span>
          </Link>
          <Link
            href='/library'
            className={cn(
              'flex items-center gap-2 text-muted-foreground',
              'px-2 py-1 text-lg'
            )}
            onClick={() => setOpen(false)}
          >
            <BookOpen className='h-5 w-5' />
            <span>Моята Библиотека</span>
          </Link>
          <Link
            href='/account'
            className={cn(
              'flex items-center gap-2 text-muted-foreground',
              'px-2 py-1 text-lg'
            )}
            onClick={() => setOpen(false)}
          >
            <UserCircle className='h-5 w-5' />
            <span>Моят Акаунт</span>
          </Link>
          <Link
            href='/login'
            className={cn(
              'flex items-center gap-2 text-muted-foreground',
              'px-2 py-1 text-lg'
            )}
            onClick={() => setOpen(false)}
          >
            <LogIn className='h-5 w-5' />
            <span>Вход</span>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
