'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Coins, User, Settings, BookOpen } from 'lucide-react';
import Link from 'next/link';

// Примерни пакети с токени
const tokenPackages = [
  {
    id: 'basic',
    name: 'Базов',
    tokens: 10,
    price: 9.99,
  },
  {
    id: 'standard',
    name: 'Стандартен',
    tokens: 25,
    price: 19.99,
  },
  {
    id: 'premium',
    name: 'Премиум',
    tokens: 60,
    price: 39.99,
  },
];

export function AccountDashboard() {
  const [userTokens, setUserTokens] = useState(5);

  // Имитация на закупуване на токени
  const handlePurchaseTokens = (amount: number) => {
    // В реална ситуация тук ще има интеграция с платежния процесор
    console.log(`Закупуване на ${amount} токена`);
    setTimeout(() => {
      setUserTokens(userTokens + amount);
      alert('Токените са добавени към вашия баланс!');
    }, 1500);
  };

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {/* Токени и баланс */}
      <Card className='col-span-full lg:col-span-1'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Текущ Баланс</CardTitle>
          <Coins className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{userTokens} токена</div>
          <p className='text-xs text-muted-foreground'>
            Всеки токен може да бъде използван за създаване на една детска
            книга.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant='outline' size='sm' className='w-full' asChild>
            <Link href='#purchase'>Закупи Токени</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Информация за профила */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Моят Профил</CardTitle>
          <User className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <p className='text-xs text-muted-foreground mt-2'>
            Име: Петър Иванов
          </p>
          <p className='text-xs text-muted-foreground mt-2'>
            Имейл: petar@example.com
          </p>
          <p className='text-xs text-muted-foreground mt-2'>
            Регистриран на: 15.01.2024
          </p>
        </CardContent>
        <CardFooter>
          <Button variant='outline' size='sm' className='w-full'>
            <Settings className='mr-2 h-4 w-4' />
            Редактирай Профил
          </Button>
        </CardFooter>
      </Card>

      {/* История на книгите */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Моите Книги</CardTitle>
          <BookOpen className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>3 книги</div>
          <p className='text-xs text-muted-foreground'>
            Общо създадени книги в платформата.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant='outline' size='sm' className='w-full' asChild>
            <Link href='/library'>Разгледай Библиотеката</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Секция за закупуване на токени */}
      <div className='col-span-full mt-6' id='purchase'>
        <h2 className='text-xl font-bold mb-6'>Закупете Токени</h2>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {tokenPackages.map((pack) => (
            <Card key={pack.id} className='flex flex-col'>
              <CardHeader>
                <CardTitle>{pack.name} Пакет</CardTitle>
                <CardDescription>{pack.tokens} токена</CardDescription>
              </CardHeader>
              <CardContent className='flex-1'>
                <p className='text-2xl font-bold'>
                  {pack.price.toFixed(2)} лв.
                </p>
                <p className='text-xs text-muted-foreground mt-2'>
                  {(pack.price / pack.tokens).toFixed(2)} лв. на токен
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className='w-full'
                  onClick={() => handlePurchaseTokens(pack.tokens)}
                >
                  <CreditCard className='mr-2 h-4 w-4' />
                  Закупи Сега
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
