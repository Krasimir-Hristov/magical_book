'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ArrowLeft, Share } from 'lucide-react';
import { useAuth } from '@/lib/auth';

// Типът за книга
interface Book {
  id: string;
  title: string;
  coverUrl: string;
  content: string[];
  ageRange: string;
  authorName: string;
}

// Dummy книги за демо
const dummyBooks: Record<string, Book> = {
  '1': {
    id: '1',
    title: 'Приключенията на Малкия Космонавт',
    coverUrl: '/placeholder-book-cover-1.jpg',
    content: [
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
    ],
    ageRange: '5-7',
    authorName: 'Мария Петрова',
  },
  '2': {
    id: '2',
    title: 'Тайната на Океана',
    coverUrl: '/placeholder-book-cover-2.jpg',
    content: [
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
    ],
    ageRange: '8-12',
    authorName: 'Иван Иванов',
  },
  '3': {
    id: '3',
    title: 'Приятелите в Градината',
    coverUrl: '/placeholder-book-cover-3.jpg',
    content: [
      'В една слънчева градина, зад синята къща, живееха най-добрите приятели: Зайо Байо, Таралежко и Катеричката Чичи.',
      'Всеки ден те играеха заедно, споделяха лакомства и си помагаха.',
      'Една сутрин Зайо се събуди и видя, че любимата му морковена леха е празна! Някой беше взел всичките му моркови!',
      '"О, не! Какво ще ям сега?" - заплака Зайо и отиде да потърси приятелите си за помощ.',
      'Таралежко предложи да потърсят следи, а Чичи се покатери на най-високото дърво, за да огледа градината.',
      'След малко Чичи забеляза нещо оранжево зад храстите с малини. Приятелите се приближиха внимателно и видяха малко лисиче.',
      'То трепереше от страх и беше много слабичко. "Извинете, че взех морковите, но бях много гладно и изгубено," каза лисичето със сълзи на очи.',
      'Зайо, въпреки че беше тъжен за морковите си, прегърна лисичето. "Няма нищо, всички изпадаме в беда понякога."',
      'Приятелите заведоха лисичето в своя дом, нахраниха го и му помогнаха да намери семейството си.',
      'От този ден лисичето често ги посещаваше и винаги носеше подаръци - горски ягоди, гъби или хубави листа за чай.',
      'А Зайо засади нови моркови - този път достатъчно, че да стигнат за всички приятели в градината.',
    ],
    ageRange: '2-4',
    authorName: 'Петър Димитров',
  },
};

export default function ReadBook() {
  const params = useParams();
  const id = params.id as string;
  const { isLoggedIn } = useAuth();
  const [book, setBook] = useState<Book | null>(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // В реален случай, тук ще има заявка към API/Supabase за получаване на книгата по ID
    const fetchBook = async () => {
      try {
        // Симулираме забавяне
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Взимаме книгата от dummy данните
        const fetchedBook = dummyBooks[id];
        if (fetchedBook) {
          setBook(fetchedBook);
        }
      } catch (error) {
        console.error('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // Ако потребителят не е логнат, трябва да го пренасочим
  if (!isLoggedIn) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen p-4'>
        <div className='max-w-md w-full text-center'>
          <h1 className='text-2xl font-bold mb-4'>Нужен е вход</h1>
          <p className='mb-6'>
            За да четете тази книга, трябва да влезете в профила си.
          </p>
          <Button asChild>
            <Link href='/login'>Вход</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen p-4'>
        <div className='max-w-md w-full text-center'>
          <h1 className='text-2xl font-bold mb-4'>Книгата не е намерена</h1>
          <p className='mb-6'>
            Съжаляваме, но книгата, която търсите, не съществува.
          </p>
          <Button asChild>
            <Link href='/'>Връщане към Начало</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Показваме корицата на първа страница
  if (page === 0) {
    return (
      <div className='flex flex-col min-h-screen p-4 max-w-4xl mx-auto'>
        <div className='mb-4'>
          <Button variant='ghost' asChild>
            <Link href='/' className='flex items-center'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Обратно към начало
            </Link>
          </Button>
        </div>

        <div className='flex-1 flex flex-col items-center justify-center'>
          <div className='w-full max-w-md aspect-[3/4] relative mb-6'>
            <img
              src={book.coverUrl}
              alt={`Корица на ${book.title}`}
              className='w-full h-full object-cover rounded-lg shadow-lg'
            />
          </div>

          <h1 className='text-3xl font-bold text-center mb-2'>{book.title}</h1>
          <p className='text-muted-foreground mb-6'>От: {book.authorName}</p>
          <p className='text-sm'>Възрастова група: {book.ageRange} години</p>

          <div className='flex gap-4 mt-8'>
            <Button variant='outline' onClick={() => setPage(1)}>
              Започни четене
              <ChevronRight className='ml-2 h-4 w-4' />
            </Button>
            <Button variant='ghost'>
              <Share className='mr-2 h-4 w-4' />
              Сподели
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Показваме съдържанието на книгата
  return (
    <div className='flex flex-col min-h-screen p-4 max-w-4xl mx-auto'>
      <div className='mb-4 flex justify-between items-center'>
        <Button variant='ghost' asChild>
          <Link href='/' className='flex items-center'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Обратно към начало
          </Link>
        </Button>
        <div className='text-center'>
          <h1 className='text-xl font-bold'>{book.title}</h1>
          <p className='text-sm text-muted-foreground'>
            Страница {page} от {book.content.length}
          </p>
        </div>
        <div className='w-[100px]'></div> {/* Празно пространство за баланс */}
      </div>

      <div className='flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full py-10'>
        <p className='text-lg leading-relaxed'>{book.content[page - 1]}</p>
      </div>

      <div className='flex justify-between items-center mt-4'>
        <Button
          variant='outline'
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        >
          <ChevronLeft className='mr-2 h-4 w-4' />
          Предишна
        </Button>

        <div className='text-sm text-muted-foreground'>
          Страница {page} от {book.content.length}
        </div>

        <Button
          variant='outline'
          onClick={() => setPage(page + 1)}
          disabled={page >= book.content.length}
        >
          Следваща
          <ChevronRight className='ml-2 h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
