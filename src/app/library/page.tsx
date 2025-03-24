import { BooksList } from '@/components/books-list';

export default function LibraryPage() {
  return (
    <div className='container py-12 flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center space-y-6'>
        <h1 className='text-3xl font-bold tracking-tighter md:text-4xl'>
          Моята Библиотека
        </h1>
        <p className='max-w-[600px] text-muted-foreground text-center md:text-xl/relaxed'>
          Преглед на всички ваши създадени детски книги.
        </p>
      </div>
      <div className='py-10 w-full flex justify-center items-center'>
        <BooksList />
      </div>
    </div>
  );
}
