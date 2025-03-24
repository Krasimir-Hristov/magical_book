'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const ageRanges = [
  { value: '2-4', label: '2-4 години' },
  { value: '5-7', label: '5-7 години' },
  { value: '8-12', label: '8-12 години' },
];

const genres = [
  { value: 'adventure', label: 'Приключенски' },
  { value: 'fantasy', label: 'Фентъзи' },
  { value: 'educational', label: 'Образователен' },
  { value: 'scifi', label: 'Научна фантастика' },
  { value: 'animals', label: 'За животни' },
  { value: 'friendship', label: 'За приятелство' },
  { value: 'family', label: 'Семеен' },
];

const coverStyles = [
  { value: 'cartoon', label: 'Анимационен' },
  { value: 'watercolor', label: 'Акварел' },
  { value: 'pixel', label: 'Пиксел арт' },
  { value: 'realistic', label: 'Реалистичен' },
  { value: 'comic', label: 'Комикс' },
];

export default function CreateBookPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    prompt: '',
    ageRange: '',
    genre: '',
    coverStyle: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Симулираме създаване на книга
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // В реалността тук ще се изпрати заявка към API
      console.log('Създаване на книга:', formData);

      // Пренасочваме към библиотеката след успешно създаване
      router.push('/library');
    } catch (error) {
      console.error('Грешка при създаване на книга:', error);
    } finally {
      setLoading(false);
    }
  };

  // Проверяваме дали потребителят е логнат
  if (!isLoggedIn) {
    // Ако не е логнат, го пренасочваме към страницата за вход
    router.push('/login');
    return null;
  }

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-purple-50 to-indigo-50 py-10'>
      <div className='container max-w-3xl'>
        <Card className='shadow-lg border-indigo-100'>
          <CardHeader className='text-center pb-2'>
            <CardTitle className='text-3xl font-bold text-indigo-800'>
              Създайте нова книга
            </CardTitle>
            <CardDescription className='text-lg mt-2'>
              Попълнете информацията по-долу, за да създадете персонализирана
              детска книга с помощта на AI.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='title'>Заглавие на книгата</Label>
                <Input
                  id='title'
                  name='title'
                  placeholder='Въведете заглавие'
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <Label htmlFor='ageRange'>Възрастова група</Label>
                  <Select
                    value={formData.ageRange}
                    onValueChange={(value) =>
                      handleSelectChange('ageRange', value)
                    }
                  >
                    <SelectTrigger id='ageRange'>
                      <SelectValue placeholder='Изберете възрастова група' />
                    </SelectTrigger>
                    <SelectContent>
                      {ageRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='genre'>Жанр</Label>
                  <Select
                    value={formData.genre}
                    onValueChange={(value) =>
                      handleSelectChange('genre', value)
                    }
                  >
                    <SelectTrigger id='genre'>
                      <SelectValue placeholder='Изберете жанр' />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((genre) => (
                        <SelectItem key={genre.value} value={genre.value}>
                          {genre.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='coverStyle'>Стил на корицата</Label>
                <Select
                  value={formData.coverStyle}
                  onValueChange={(value) =>
                    handleSelectChange('coverStyle', value)
                  }
                >
                  <SelectTrigger id='coverStyle'>
                    <SelectValue placeholder='Изберете стил' />
                  </SelectTrigger>
                  <SelectContent>
                    {coverStyles.map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='prompt'>
                  Описание на историята (бъдете колкото се може по-конкретни)
                </Label>
                <Textarea
                  id='prompt'
                  name='prompt'
                  placeholder='Опишете историята, която искате да създадете. Например: "Малкото мече Бруно се губи в гората и трябва да намери пътя към дома си с помощта на горските животни."'
                  className='min-h-[120px]'
                  value={formData.prompt}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <Button
                type='button'
                variant='outline'
                onClick={() => router.back()}
              >
                Отказ
              </Button>
              <Button type='submit' disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Създаване...
                  </>
                ) : (
                  'Създай книга'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className='mt-8 p-6 border rounded-lg bg-white shadow-md'>
          <h3 className='text-lg font-medium mb-4 text-indigo-800'>
            Съвети за създаване на добра книга:
          </h3>
          <ul className='list-disc list-inside space-y-2 text-gray-700'>
            <li>Бъдете конкретни в описанието на историята</li>
            <li>Включете главни герои с ясни характеристики</li>
            <li>Помислете за основното послание или поука</li>
            <li>Използвайте въображение и забавни елементи</li>
            <li>Съобразете сложността с избраната възрастова група</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
