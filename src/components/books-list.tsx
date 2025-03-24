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
import { motion } from 'framer-motion';

// Интерфейс за книга
interface Book {
  id: string;
  title: string;
  coverUrl: string;
  ageRange: string;
  createdAt: string;
  authorName?: string;
}

// Интерфейс за пропс на компонента
interface BooksListProps {
  books?: Book[];
  showDeleteButton?: boolean;
}

// Примерни данни за книги
const booksData: Book[] = [
  {
    id: '1',
    title: 'Приключенията на Малкия Космонавт',
    coverUrl: '/aiavatar.png',
    ageRange: '5-7',
    createdAt: '15.03.2024',
    authorName: 'Мария Петрова',
  },
  {
    id: '2',
    title: 'Тайната на Океана',
    coverUrl: '/aiavatar.png',
    ageRange: '8-12',
    createdAt: '14.03.2024',
    authorName: 'Иван Иванов',
  },
  {
    id: '3',
    title: 'Приятелите в Градината',
    coverUrl: '/aiavatar.png',
    ageRange: '2-4',
    createdAt: '13.03.2024',
    authorName: 'Петър Димитров',
  },
];

export function BooksList({
  books: propBooks,
  showDeleteButton = true,
}: BooksListProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [books, setBooks] = useState(propBooks || booksData);
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

  // Контейнер за анимации
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Анимации за елемент
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div>
      {books.length === 0 ? (
        <motion.div
          className='flex flex-col items-center justify-center py-12 text-center'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <BookOpen className='h-12 w-12 text-muted-foreground mb-4' />
          </motion.div>
          <h3 className='text-lg font-medium'>
            Нямате създадени книги все още
          </h3>
          <p className='text-muted-foreground mt-2 mb-4'>
            Създайте вашата първа книга и тя ще се появи тук.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild>
              <Link href='/create'>Създай Книга</Link>
            </Button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          variants={container}
          initial='hidden'
          animate='show'
        >
          {books.map((book) => (
            <motion.div
              key={book.id}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className='flex flex-col bg-white rounded-lg shadow-md overflow-hidden h-[400px]'
            >
              {/* Корица на книгата с фиксирана височина */}
              <div className='relative h-40 overflow-hidden'>
                <motion.img
                  src={book.coverUrl}
                  alt={book.title}
                  className='w-full h-full object-cover'
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent' />
              </div>

              {/* Съдържание на книгата */}
              <div className='flex-grow flex flex-col p-4'>
                <h3 className='text-lg font-semibold line-clamp-2 mb-1'>
                  {book.title}
                </h3>

                <div className='text-sm text-muted-foreground mb-2 flex items-center justify-between'>
                  <span>Възраст: {book.ageRange}</span>
                  <span className='text-xs'>{book.createdAt}</span>
                </div>

                {book.authorName && (
                  <p className='text-sm text-muted-foreground'>
                    Автор: {book.authorName}
                  </p>
                )}

                <div className='flex-grow' />
              </div>

              {/* Бутони за действия */}
              <div className='p-4 border-t border-border/40 flex gap-2 mt-auto'>
                <motion.div
                  className='flex-1'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    className='w-full'
                    variant='outline'
                    onClick={() => handleReadBook(book.id)}
                  >
                    <Eye className='w-4 h-4 mr-2' />
                    Прочети
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => handleShare(book.id)}
                  >
                    <Share className='h-4 w-4' />
                  </Button>
                </motion.div>

                {showDeleteButton && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
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
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
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
