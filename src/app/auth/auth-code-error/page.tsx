'use client';

export default function AuthCodeError() {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold mb-4'>Грешка при автентикация</h1>
        <p className='mb-4'>
          Възникна проблем при обработката на вашата автентикация.
        </p>
        <p>
          Моля опитайте отново или се свържете с нас ако проблемът продължава.
        </p>
      </div>
    </div>
  );
}
