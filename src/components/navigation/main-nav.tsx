'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BookOpen, Star, UserCircle, LogIn } from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: 'Начало',
    href: '/',
    icon: <Star className='h-5 w-5' />,
  },
  {
    title: 'Създай Книга',
    href: '/create',
    icon: <BookOpen className='h-5 w-5' />,
  },
  {
    title: 'Моята Библиотека',
    href: '/library',
    icon: <BookOpen className='h-5 w-5' />,
  },
  {
    title: 'Моят Акаунт',
    href: '/account',
    icon: <UserCircle className='h-5 w-5' />,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className='flex items-center space-x-4'>
      <Link href='/' className='flex items-center space-x-2'>
        <BookOpen className='h-6 w-6' />
        <span className='font-bold hidden sm:inline-block'>Вълшебна Книга</span>
      </Link>
      <div className='flex items-center space-x-1 sm:space-x-2'>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center px-2 sm:px-3 py-2 text-sm font-medium transition-colors hover:text-primary',
              pathname === item.href ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {item.icon}
            <span className='ml-1 hidden md:inline-block'>{item.title}</span>
          </Link>
        ))}
        <Link
          href='/login'
          className='flex items-center px-2 sm:px-3 py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground'
        >
          <LogIn className='h-5 w-5' />
          <span className='ml-1 hidden md:inline-block'>Вход</span>
        </Link>
      </div>
    </nav>
  );
}
