import { RegisterForm } from '@/components/auth';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className='container flex h-screen w-screen flex-col items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col space-y-2 text-center'>
          <div className='mx-auto flex items-center justify-center'>
            <BookOpen className='h-8 w-8 text-primary' />
          </div>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Създайте акаунт
          </h1>
          <p className='text-sm text-muted-foreground'>
            Въведете своите данни за регистрация
          </p>
        </div>
        <RegisterForm />
        <p className='px-8 text-center text-sm text-muted-foreground'>
          <Link
            href='/login'
            className='hover:text-brand underline underline-offset-4'
          >
            Вече имате акаунт? Влезте
          </Link>
        </p>
      </div>
    </div>
  );
}
