'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BookOpen, Star, UserCircle, Info, CreditCard } from 'lucide-react';

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
    icon: <UserCircle className='h-5 w-5' />,
  },
  {
    title: 'Как Работи',
    href: '/how-it-works',
    icon: <Info className='h-5 w-5' />,
  },
  {
    title: 'Ценоразпис',
    href: '/pricing',
    icon: <CreditCard className='h-5 w-5' />,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className='flex items-center justify-between w-full'>
      <div className='flex-1 flex justify-start'>
        <Link href='/' className='flex items-center space-x-2'>
          <BookOpen className='h-6 w-6' />
          <span className='font-bold'>Вълшебна Книга</span>
        </Link>
      </div>
      <nav className='flex justify-center items-center space-x-8'>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary',
              pathname === item.href ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {item.icon}
            <span className='ml-1 hidden md:inline-block'>{item.title}</span>
          </Link>
        ))}
      </nav>
      <div className='flex-1'>
        {/* Празно пространство в дясно за баланс */}
      </div>
    </div>
  );
}
