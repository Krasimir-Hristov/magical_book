'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import GoogleAuthComponent from '@/components/auth/google-auth';
import { BookOpen } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white'>
      <div className='container flex flex-col items-center justify-center min-h-screen py-12 px-4'>
        <div className='mb-8 flex flex-col items-center'>
          <BookOpen className='h-12 w-12 text-blue-600 mb-4' />
          <h1 className='text-3xl font-bold text-gray-900 text-center'>
            Вълшебна Книга
          </h1>
          <p className='mt-2 text-lg text-gray-600 text-center'>
            Създайте персонализирани детски книги с помощта на AI
          </p>
        </div>

        <Card className='w-full max-w-md shadow-lg'>
          <CardHeader className='space-y-2 text-center'>
            <CardTitle className='text-2xl'>Добре дошли</CardTitle>
            <CardDescription className='text-base'>
              Влезте с вашия Google акаунт, за да започнете да създавате
              вълшебни истории за вашите деца
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <GoogleAuthComponent />
              <p className='text-sm text-gray-500 text-center mt-6'>
                При влизане в системата, вие се съгласявате с нашите{' '}
                <a href='/terms' className='text-blue-600 hover:underline'>
                  Условия за ползване
                </a>{' '}
                и{' '}
                <a href='/privacy' className='text-blue-600 hover:underline'>
                  Политика за поверителност
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
