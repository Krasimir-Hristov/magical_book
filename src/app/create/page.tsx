import { BookCreationForm } from '@/components/book-creation-form';

export default function CreateBookPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tighter md:text-4xl'>
          Създайте своята детска книга
        </h1>
        <p className='mx-auto mt-4 max-w-[600px] text-muted-foreground md:text-xl/relaxed'>
          Въведете творческа идея, изберете възрастовата група и стил, за да
          създадете уникална детска книга.
        </p>
      </div>
      <div className='mt-8 w-full max-w-xl'>
        <BookCreationForm />
      </div>
    </div>
  );
}
