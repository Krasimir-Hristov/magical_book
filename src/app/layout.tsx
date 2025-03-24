import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Вълшебна Книга | AI Детски Книги',
  description:
    'Платформа за създаване на детски книги с помощта на изкуствен интелект',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='bg'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className='flex-1 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
