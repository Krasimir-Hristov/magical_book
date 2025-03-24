import { BookCreationForm } from '@/components/book-creation-form';

export default function CreateBookPage() {
  return (
    <div className='container max-w-screen-md py-12'>
      <div className='flex flex-col space-y-6 text-center'>
        <h1 className='text-3xl font-bold tracking-tighter md:text-4xl'>
          Създайте своята детска книга
        </h1>
        <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed'>
          Въведете творческа идея, изберете възрастовата група и стил за да
          създадете уникална детска книга.
        </p>
      </div>
      <div className='mx-auto w-full max-w-xl py-12'>
        <BookCreationForm />
      </div>
    </div>
  );
}
