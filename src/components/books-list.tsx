'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Eye, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Примерни данни за книги
const booksData = [
  {
    id: '1',
    title: 'Вълшебното Пътешествие',
    coverImage: '/placeholder-book-cover.jpg',
    ageRange: '5-7',
    createdAt: '24.03.2024',
  },
  {
    id: '2',
    title: 'Приятелите от Гората',
    coverImage: '/placeholder-book-cover.jpg',
    ageRange: '2-4',
    createdAt: '18.03.2024',
  },
  {
    id: '3',
    title: 'Космическото Приключение',
    coverImage: '/placeholder-book-cover.jpg',
    ageRange: '8-12',
    createdAt: '10.03.2024',
  },
];

export function BooksList() {
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
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {books.map((book) => (
            <Card key={book.id} className='overflow-hidden'>
              <div className='aspect-[3/4] w-full bg-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center'>
                <BookOpen className='h-12 w-12 text-indigo-600 dark:text-indigo-300' />
              </div>
              <CardHeader className='p-4'>
                <CardTitle className='line-clamp-1 text-lg'>
                  {book.title}
                </CardTitle>
              </CardHeader>
              <CardContent className='p-4 pt-0 text-sm text-muted-foreground'>
                <p>Възраст: {book.ageRange} години</p>
                <p>Създадена на: {book.createdAt}</p>
              </CardContent>
              <CardFooter className='flex justify-between p-4'>
                <Button variant='outline' size='sm' asChild>
                  <Link href={`/library/${book.id}`}>
                    <Eye className='mr-2 h-4 w-4' />
                    Преглед
                  </Link>
                </Button>
                <Button
                  variant='destructive'
                  size='sm'
                  onClick={() => {
                    setBookToDelete(book.id);
                    setIsDialogOpen(true);
                  }}
                >
                  <Trash2 className='mr-2 h-4 w-4' />
                  Изтрий
                </Button>
              </CardFooter>
            </Card>
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
