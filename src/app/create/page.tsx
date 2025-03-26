'use client';

import { useState, useEffect } from 'react';
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
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    theme: '',
    title: '',
    ageGroup: '',
    coverStyle: '',
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

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
      // Тук ще добавим логиката за генериране на книгата
      console.log('Генериране на книга със следните параметри:', formData);
    } catch (error) {
      console.error('Грешка при генериране на книгата:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
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
              <div className='grid gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='theme'>Тема на книгата</Label>
                  <Textarea
                    id='theme'
                    name='theme'
                    value={formData.theme}
                    onChange={handleChange}
                    placeholder='Например: Приключения в космоса, където малко момиче открива нови планети и се сприятелява с извънземни създания.'
                    className='min-h-[120px]'
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='title'>Заглавие</Label>
                  <Input
                    id='title'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    placeholder='Въведете заглавие на книгата'
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='ageGroup'>Възрастова група</Label>
                  <Select
                    value={formData.ageGroup}
                    onValueChange={(value) =>
                      handleSelectChange('ageGroup', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Изберете възрастова група' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='2-4'>2-4 години</SelectItem>
                      <SelectItem value='5-7'>5-7 години</SelectItem>
                      <SelectItem value='8-12'>8-12 години</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='coverStyle'>Стил на корицата</Label>
                  <Select
                    value={formData.coverStyle}
                    onValueChange={(value) =>
                      handleSelectChange('coverStyle', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Изберете стил на корицата' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='cartoon'>Анимационен</SelectItem>
                      <SelectItem value='watercolor'>Акварел</SelectItem>
                      <SelectItem value='realistic'>Реалистичен</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='mt-8 p-6 border rounded-lg bg-white/50 shadow-sm'>
                <h3 className='text-lg font-medium mb-4 text-indigo-800'>
                  Съвети за създаване на добра книга:
                </h3>
                <ul className='list-disc list-inside space-y-2 text-gray-700'>
                  <li>Бъдете конкретни в описанието на темата</li>
                  <li>Помислете за основното послание или поука</li>
                  <li>Използвайте въображение и забавни елементи</li>
                  <li>Съобразете сложността с избраната възрастова група</li>
                </ul>
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
      </div>
    </div>
  );
}
