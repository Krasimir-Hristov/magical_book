import { BooksList } from '@/components/books-list';

export default function LibraryPage() {
  return (
    <div className='container py-12'>
      <div className='flex flex-col space-y-6'>
        <h1 className='text-3xl font-bold tracking-tighter md:text-4xl'>
          Моята Библиотека
        </h1>
        <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed'>
          Преглед на всички ваши създадени детски книги.
        </p>
      </div>
      <div className='py-10'>
        <BooksList />
      </div>
    </div>
  );
}
