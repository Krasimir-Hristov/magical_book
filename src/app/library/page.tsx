'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { BooksList } from '@/components/books-list';

export default function LibraryPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Ако потребителят не е логнат, пренасочваме към login страницата
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  // Показваме loading индикатор на сървъра или докато проверяваме статуса
  if (!isClient || !isLoggedIn) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
      </div>
    );
  }

  // Ако потребителят е логнат, показваме библиотеката с книги
  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-8 text-center'>Моята Библиотека</h1>

      <div className='max-w-6xl mx-auto'>
        <BooksList />
      </div>
    </div>
  );
}
