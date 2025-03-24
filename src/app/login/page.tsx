'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // В реалността тук ще направите истинска заявка за автентикация
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Симулираме забавяне

      // Симулираме проверки
      if (!email || !email.includes('@')) {
        throw new Error('Моля, въведете валиден имейл адрес');
      }

      if (!password || password.length < 6) {
        throw new Error('Паролата трябва да бъде поне 6 символа');
      }

      // Ако всичко е наред, логваме потребителя
      login();

      // Пренасочваме към началната страница
      router.push('/');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Възникна грешка при опит за вход'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-[80vh] py-12'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center'>Вход</CardTitle>
          <CardDescription className='text-center'>
            Въведете своите данни за достъп
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className='space-y-4'>
            {error && (
              <div className='p-3 text-sm bg-red-50 text-red-600 rounded-md'>
                {error}
              </div>
            )}

            <div className='space-y-2'>
              <Label htmlFor='email'>Имейл</Label>
              <Input
                id='email'
                type='email'
                placeholder='example@email.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='password'>Парола</Label>
                <Link
                  href='/forgot-password'
                  className='text-sm text-muted-foreground hover:text-primary'
                >
                  Забравена парола?
                </Link>
              </div>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>

          <CardFooter className='flex flex-col space-y-4'>
            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? 'Влизане...' : 'Вход'}
            </Button>

            <div className='text-sm text-center text-muted-foreground'>
              Нямате профил?{' '}
              <Link href='/register' className='text-primary hover:underline'>
                Регистрирайте се
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
