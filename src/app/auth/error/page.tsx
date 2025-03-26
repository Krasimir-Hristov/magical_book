'use client'; // Този компонент ще използва searchParams, затова е клиентски

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('message');

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Грешка при автентикация</h1>
      <p style={{ color: 'red', marginBottom: '20px' }}>
        {errorMessage || 'Възникна неочаквана грешка.'}
      </p>
      <Link href='/'>Обратно към началната страница</Link>
      <br />
      <br />
      <Link href='/login'>Опитай да влезеш отново</Link>
    </div>
  );
}
