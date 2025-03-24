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
const paragraphsPerPage = 8;

// Dummy книги за демо
const dummyBooks: Record<string, Book> = {
  '1': {
    id: '1',
    title: 'Приключенията на Малкия Космонавт',
    coverUrl: '/aiavatar.png',
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
    coverUrl: '/aiavatar.png',
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
    coverUrl: '/aiavatar.png',
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
  const paragraphsPerPage = 8;

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
    <div className='min-h-screen bg-amber-50 py-10 px-4 sm:px-6 pb-32 relative'>
      <div className='max-w-5xl mx-auto'>
        {/* Заглавие и бутони за навигация */}
        <div className='flex justify-between items-center mb-8'>
          <Button
            variant='ghost'
            onClick={() => router.push('/')}
            className='hover:bg-amber-100 transition-colors'
          >
            <ChevronLeft className='mr-2 h-4 w-4' />
            Назад към библиотеката
          </Button>
          <DownloadBook
            bookId={book.id}
            bookTitle={book.title}
            bookContent={book.content.join('\n\n')}
            coverUrl={book.coverUrl}
          />
        </div>

        {/* Контейнер за книгата */}
        <div className='book-container'>
          {currentPage === 0 ? (
            /* Заглавна страница / Корица на книгата */
            <div className='relative'>
              {/* Книжно оформление за корицата */}
              <div className='absolute inset-0 bg-amber-100 shadow-2xl rounded-lg -z-10 transform -rotate-1 translate-x-2'></div>
              <div className='absolute inset-0 bg-amber-100 shadow-2xl rounded-lg -z-10 transform rotate-1 -translate-x-2'></div>

              <div className='bg-gradient-to-b from-amber-200 to-white rounded-lg shadow-lg overflow-hidden border border-amber-300 p-12 sm:p-16 relative min-h-[70vh] flex flex-col items-center justify-center'>
                <div className='text-center'>
                  <h1 className='text-5xl sm:text-6xl font-serif font-bold text-amber-900 mb-8 px-4'>
                    {book.title}
                  </h1>
                  <div className='w-32 h-1 bg-amber-400 mx-auto mb-8'></div>

                  <div className='mb-10 flex justify-center'>
                    <img
                      src={book.coverUrl}
                      alt={`Корица на книгата ${book.title}`}
                      className='h-72 sm:h-96 rounded-md shadow-xl border-4 border-amber-100'
                    />
                  </div>

                  <p className='text-center text-amber-800 font-medium text-xl sm:text-2xl mt-8'>
                    от {book.authorName}
                  </p>
                  <p className='text-center text-amber-700 mt-3'>
                    За възраст: {book.ageRange} години
                  </p>

                  <div className='mt-16 animate-bounce'>
                    <p className='text-amber-600 font-medium'>
                      Натиснете "Следваща страница" за да започнете
                    </p>
                    <ChevronRight className='h-8 w-8 text-amber-600 mx-auto mt-2' />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Страници със съдържание */
            <div className='relative'>
              {/* Книжно оформление */}
              <div className='absolute inset-0 bg-white shadow-2xl rounded-lg -z-10 transform -rotate-1 translate-x-2'></div>
              <div className='absolute inset-0 bg-white shadow-2xl rounded-lg -z-10 transform rotate-1 -translate-x-2'></div>

              {/* Същинско съдържание */}
              <div className='bg-white rounded-lg shadow-lg border border-amber-100 p-8 sm:p-12 relative'>
                <div className='font-serif prose prose-amber prose-lg max-w-none mb-16'>
                  {currentParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className='mb-6 text-gray-800 leading-relaxed first:first-letter:text-4xl first:first-letter:font-bold first:first-letter:text-amber-800 first:first-letter:mr-1 first:first-letter:float-left'
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Номер на страница */}
                <div className='absolute bottom-4 left-0 right-0 flex justify-center'>
                  <div className='font-serif text-amber-800 text-sm border-t border-amber-200 pt-2 px-6'>
                    <span>{currentPage}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Навигация между страниците - фиксирана в долната част на екрана */}
      <div className='fixed bottom-0 left-0 right-0 bg-gradient-to-t from-amber-100/90 to-amber-50/90 backdrop-blur-sm p-4 border-t border-amber-200 shadow-lg z-10'>
        <div className='max-w-5xl mx-auto flex justify-between items-center'>
          <Button
            variant='outline'
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className='bg-amber-50 border-amber-400 hover:bg-amber-200 text-amber-900 font-medium shadow-sm transition-all px-6 py-3'
            size='lg'
          >
            <ChevronLeft className='mr-2 h-5 w-5' />
            {currentPage === 1 ? 'Към корицата' : 'Предишна страница'}
          </Button>
          <span className='text-amber-800 font-medium px-4 py-2 bg-amber-50/80 rounded-full border border-amber-200'>
            {currentPage === 0 ? 'Корица' : `Страница ${currentPage}`} /{' '}
            {totalPages}
          </span>
          <Button
            variant='outline'
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className='bg-amber-50 border-amber-400 hover:bg-amber-200 text-amber-900 font-medium shadow-sm transition-all px-6 py-3'
            size='lg'
          >
            {currentPage === 0 ? 'Започни четене' : 'Следваща страница'}
            <ChevronRight className='ml-2 h-5 w-5' />
          </Button>
        </div>
      </div>
    </div>
  );
}
