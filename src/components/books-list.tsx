'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Eye, Trash2, Share } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

// Примерни данни за книги
interface Book {
  id: string;
  title: string;
  coverUrl: string;
  ageRange: string;
  createdAt: string;
}

const booksData: Book[] = [
  {
    id: '1',
    title: 'Приключенията на Малкия Космонавт',
    coverUrl: '/placeholder-book-cover-1.jpg',
    ageRange: '5-7',
    createdAt: '15.03.2024',
  },
  {
    id: '2',
    title: 'Тайната на Океана',
    coverUrl: '/placeholder-book-cover-2.jpg',
    ageRange: '8-12',
    createdAt: '14.03.2024',
  },
  {
    id: '3',
    title: 'Приятелите в Градината',
    coverUrl: '/placeholder-book-cover-3.jpg',
    ageRange: '2-4',
    createdAt: '13.03.2024',
  },
];

export function BooksList() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [books, setBooks] = useState(booksData);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteBook = () => {
    if (bookToDelete) {
      setBooks(books.filter((book) => book.id !== bookToDelete));
      setBookToDelete(null);
      setIsDialogOpen(false);
    }
  };

  const handleReadBook = (bookId: string) => {
    if (isLoggedIn) {
      router.push(`/read/${bookId}`);
    } else {
      router.push('/login');
    }
  };

  const handleShare = (bookId: string) => {
    // В реалността тук ще се имплементира споделяне
    alert(`Книгата с ID ${bookId} ще бъде споделена.`);
  };

  return (
    <div>
      {books.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          <BookOpen className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-medium'>
            Нямате създадени книги все още
          </h3>
          <p className='text-muted-foreground mt-2 mb-4'>
            Създайте вашата първа книга и тя ще се появи тук.
          </p>
          <Button asChild>
            <Link href='/create'>Създай Книга</Link>
          </Button>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center'>
          {books.map((book) => (
            <div
              key={book.id}
              className='bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden'
              style={{
                height: '400px',
                display: 'grid',
                gridTemplateRows: 'auto auto 1fr auto',
              }}
            >
              {/* Изображение - фиксирана височина */}
              <div style={{ height: '160px' }}>
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Заглавие и дата - фиксирана височина */}
              <div className='p-4 pb-2'>
                <h3 className='text-lg font-semibold truncate'>{book.title}</h3>
                <p className='text-sm text-gray-500'>
                  Създадена на: {book.createdAt}
                </p>
              </div>

              {/* Допълнителна информация - раздел с разширяемо съдържание */}
              <div className='p-4 pt-0 overflow-hidden'>
                <p className='text-sm text-gray-500'>
                  Възраст: {book.ageRange} години
                </p>
              </div>

              {/* Бутони - фиксирана височина в долната част */}
              <div className='p-4 border-t flex gap-2'>
                <Button
                  className='flex-1'
                  variant='outline'
                  onClick={() => handleReadBook(book.id)}
                >
                  Прочети
                </Button>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => handleShare(book.id)}
                >
                  <Share className='h-4 w-4' />
                </Button>
                <Button
                  variant='outline'
                  size='icon'
                  className='text-red-500 hover:text-red-700 hover:bg-red-50'
                  onClick={() => {
                    setBookToDelete(book.id);
                    setIsDialogOpen(true);
                  }}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Диалог за потвърждение на изтриване */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Потвърдете изтриването</DialogTitle>
            <DialogDescription>
              Наистина ли искате да изтриете тази книга? Това действие не може
              да бъде отменено.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsDialogOpen(false)}>
              Отказ
            </Button>
            <Button variant='destructive' onClick={handleDeleteBook}>
              Изтрий
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
