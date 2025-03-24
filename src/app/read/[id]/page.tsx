'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { DownloadBook } from '@/components/download-book';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Типът за книга
interface Book {
  id: string;
  title: string;
  coverUrl: string;
  content: string[];
  ageRange: string;
  authorName: string;
}

// Фунция за генериране на примерно съдържание на книга
function generateDummyContent(
  prefix: string,
  pages: number,
  paragraphsPerPage: number
): string[] {
  const content: string[] = [];
  for (let i = 0; i < pages; i++) {
    for (let j = 0; j < paragraphsPerPage; j++) {
      const paragraphIndex = i * paragraphsPerPage + j + 1;
      content.push(
        `${prefix} - Страница ${i + 1}, Параграф ${
          j + 1
        }: Това е параграф ${paragraphIndex} от примерната книга. Тук може да има всякакво интересно съдържание, което би било полезно за тестване на визуализацията на книгата. Колкото по-дълго е съдържанието, толкова по-добре можем да тестваме функционалността за преглед на страниците и за изтегляне като PDF.`
      );
    }
  }
  return content;
}

// Базово съдържание за всяка книга
const baseContentBook1 = [
  'Имало едно време едно малко момче, което мечтаело да стане космонавт и да пътува между звездите.',
  'То всяка вечер гледало към небето и си представяло как пътува с ракета до далечни планети и среща странни извънземни същества.',
  'Един ден, докато си играело в градината, то забелязало нещо блестящо между цветята.',
  'Оказало се малка космическа капсула, не по-голяма от кутия за обувки, от която се появило миниатюрно извънземно с две антени.',
  '"Здравей, аз съм Зип от планетата Зептон. Търся приятел, който да ми помогне да се върна у дома," казало извънземното.',
  'Момчето се съгласило да помогне на Зип и заедно построили малка ракета от стари играчки и кутии.',
  'С помощта на специалните сили на Зип, ракетата започнала да работи и двамата полетели към звездите.',
  'По пътя си срещнали много интересни планети: едната била цялата от сладолед, другата - от цветни балони, а третата била дом на говорещи животни.',
  'Накрая стигнали до Зептон, където Зип представил своя нов приятел на семейството си.',
  'Всички били толкова благодарни, че подарили на момчето специален космически костюм, с който можело да посещава Зип, когато пожелае.',
  'И така започнали безкрайните космически приключения на малкия космонавт и неговия извънземен приятел.',
];

const baseContentBook2 = [
  'Дълбоко под повърхността на океана се намираше тайнственото подводно кралство Атлантика.',
  'Там живееше малката русалка Марина, която обичаше да изследва скритите съкровища и да говори с морските създания.',
  'Един ден, докато плуваше близо до големия коралов риф, тя забеляза странна светлина, идваща от една древна пещера.',
  'Любопитна, Марина влезе в пещерата и откри магическа перла, която блестеше в най-различни цветове.',
  '"Това е Сърцето на Океана," прошепна един стар октопод, който живееше наблизо. "Легендата казва, че който го притежава, може да разбира и контролира всички морски течения."',
  'Скоро Марина разбрала, че злият морски магьосник Мрак също търси перлата, за да използва силата й и да създаде огромни бури и вълни, които да унищожат крайбрежните градове на хората.',
  'Решена да защити както подводния, така и надводния свят, Марина и нейните приятели - бързият делфин Скип, мъдрата костенурка Ейдж и смелата риба-меч Блейд - предприели опасно пътешествие до Тъмната падина.',
  'По пътя си те преодолели много препятствия - минали през опасния лабиринт от водорасли, избегнали капаните на отровните медузи и се изправили срещу гигантска акула.',
  'Когато стигнали до леговището на Мрак, те използвали хитрост и сила, за да го победят и да откраднат магическата книга със заклинанията му.',
  'С помощта на Сърцето на Океана и древните знания от книгата, Марина създала магическа бариера около Атлантика, която да защитава кралството от бъдещи опасности.',
  'Оттогава тя станала пазителка на океана, помагайки на всички морски създания и поддържайки мира между подводния и надводния свят.',
];

const baseContentBook3 = [
  'В една слънчева градина, зад синята къща, живееха най-добрите приятели: Зайо Байо, Таралежко и Катеричката Чичи.',
  'Всеки ден те играеха заедно, споделяха лакомства и си помагаха.',
  'Една сутрин Зайо се събуди и видя, че любимата му морковена леха е празна! Някой беше взел всичките му моркови!',
  '"О, не! Какво ще ям сега?" - заплака Зайо и отиде да потърси приятелите си за помощ.',
  'Таралежко предложи да потърсят следи, а Чичи се покатери на най-високото дърво, за да огледа градината.',
  'След малко Чичи забеляза нещо оранжево зад храстите с малини. Приятелите се приближиха внимателно и видяха малко лисиче.',
  'То трепереше от страх и беше много слабичко. "Извинете, че взех морковите, но бях много гладно и изгубено," каза лисичето със сълзи на очи.',
  'Зайо, въпреки че беше тъжен за морковите си, прегърна лисичето. "Няма нищо, всички изпадаме в бедаometimes."',
  'Приятелите заведоха лисичето в своя дом, нахраниха го и му помогнаха да намери семейството си.',
  'От този ден лисичето често ги посещаваше и винаги носеше подаръци - горски ягоди, гъби или хубави листа за чай.',
  'А Зайо засади нови моркови - този път достатъчно, че да стигнат за всички приятели в градината.',
];

// Генерираме допълнително съдържание за всяка книга
const pages = 20;
const paragraphsPerPage = 10;

// Dummy книги за демо
const dummyBooks: Record<string, Book> = {
  '1': {
    id: '1',
    title: 'Приключенията на Малкия Космонавт',
    coverUrl: 'https://placehold.co/400x600/4f46e5/ffffff?text=Космонавт',
    content: [
      ...baseContentBook1,
      ...generateDummyContent(
        'Космически приключения',
        pages - 1,
        paragraphsPerPage
      ),
    ],
    ageRange: '5-7',
    authorName: 'Мария Петрова',
  },
  '2': {
    id: '2',
    title: 'Тайната на Океана',
    coverUrl: 'https://placehold.co/400x600/0ea5e9/ffffff?text=Океан',
    content: [
      ...baseContentBook2,
      ...generateDummyContent(
        'Подводни приключения',
        pages - 1,
        paragraphsPerPage
      ),
    ],
    ageRange: '8-12',
    authorName: 'Иван Иванов',
  },
  '3': {
    id: '3',
    title: 'Приятелите в Градината',
    coverUrl: 'https://placehold.co/400x600/22c55e/ffffff?text=Градина',
    content: [
      ...baseContentBook3,
      ...generateDummyContent(
        'Градински истории',
        pages - 1,
        paragraphsPerPage
      ),
    ],
    ageRange: '2-4',
    authorName: 'Петър Димитров',
  },
};

export default function ReadBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const paragraphsPerPage = 10;

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const loadBook = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const selectedBook = dummyBooks[resolvedParams.id];
        if (!selectedBook) {
          throw new Error('Book not found');
        }
        setBook(selectedBook);
      } catch (error) {
        console.error('Error loading book:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [isLoggedIn, router, resolvedParams.id]);

  const totalPages = book
    ? Math.ceil(book.content.length / paragraphsPerPage)
    : 0;

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Книгата не е намерена</h1>
          <Button onClick={() => router.push('/')}>
            Върни се към началната страница
          </Button>
        </div>
      </div>
    );
  }

  const startIndex = currentPage * paragraphsPerPage;
  const endIndex = startIndex + paragraphsPerPage;
  const currentParagraphs = book.content.slice(startIndex, endIndex);

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>{book.title}</h1>
        <div className='flex gap-4'>
          <DownloadBook
            bookId={book.id}
            bookTitle={book.title}
            bookContent={book.content.join('\n\n')}
            coverUrl={book.coverUrl}
          />
          <Button variant='outline' onClick={() => router.push('/')}>
            Назад
          </Button>
        </div>
      </div>

      <div className='prose prose-lg max-w-none'>
        <p className='text-gray-600 mb-8'>Автор: {book.authorName}</p>
        <div className='whitespace-pre-wrap min-h-[400px]'>
          {currentParagraphs.map((paragraph, index) => (
            <p key={index} className='mb-4'>
              {paragraph}
            </p>
          ))}
        </div>

        <div className='flex justify-between items-center mt-8 pt-4 border-t'>
          <Button
            variant='outline'
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft className='mr-2 h-4 w-4' />
            Предишна страница
          </Button>
          <span className='text-gray-600'>
            Страница {currentPage + 1} от {totalPages}
          </span>
          <Button
            variant='outline'
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            Следваща страница
            <ChevronRight className='ml-2 h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
