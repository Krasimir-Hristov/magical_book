'use client';

import { MainNav } from '@/components/navigation/main-nav';
import { MobileNav } from '@/components/navigation/mobile-nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BookOpen, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

export function Header() {
  const { isLoggedIn, userName, logout } = useAuth();

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 max-w-screen-xl items-center justify-between mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Мобилна навигация (видима само на малки екрани) */}
        <div className='flex items-center sm:hidden'>
          <MobileNav />
          <Link href='/' className='flex items-center ml-2'>
            <BookOpen className='h-6 w-6' />
            <span className='font-bold ml-2'>Вълшебна Книга</span>
          </Link>
        </div>

        {/* Основна навигация */}
        <div className='hidden sm:flex flex-1 justify-center'>
          <MainNav />
        </div>

        <div className='flex items-center space-x-4'>
          {isLoggedIn ? (
            <div className='flex items-center'>
              <DropdownMenu>
                <DropdownMenuTrigger className='overflow-hidden rounded-full'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src='/placeholder-avatar.jpg' alt={userName} />
                    <AvatarFallback>
                      {userName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href='/account'>Профил</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href='/library'>Моите книги</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href='/account#settings'>Настройки</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Изход</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link
              href='/login'
              className='flex items-center px-2 sm:px-3 py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground'
            >
              <LogIn className='h-5 w-5' />
              <span className='ml-1 hidden md:inline-block'>Вход</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
