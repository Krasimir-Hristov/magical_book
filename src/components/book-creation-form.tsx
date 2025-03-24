'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BookOpen, Loader2 } from 'lucide-react';

const bookFormSchema = z.object({
  prompt: z.string().min(10, {
    message: 'Вашата идея трябва да бъде поне 10 символа.',
  }),
  ageRange: z.string({
    required_error: 'Моля изберете възрастова група.',
  }),
  coverStyle: z.string({
    required_error: 'Моля изберете стил за корицата.',
  }),
});

type BookFormValues = z.infer<typeof bookFormSchema>;

const defaultValues: Partial<BookFormValues> = {
  prompt: '',
  ageRange: '',
  coverStyle: '',
};

export function BookCreationForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues,
  });

  function onSubmit(data: BookFormValues) {
    setIsLoading(true);

    // Симулирам заявка към API
    setTimeout(() => {
      console.log(data);
      setIsLoading(false);
      // След реална интеграция тук ще има редирект към създадената книга
      // router.push("/library/new-book-id")
    }, 3000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='prompt'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Вашата идея</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Напишете вашата творческа идея за детска книга...'
                  className='min-h-[120px]'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Напишете кратко описание на историята, която искате да
                създадете.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='ageRange'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Възрастова група</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Изберете възрастова група' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='2-4'>2-4 години</SelectItem>
                  <SelectItem value='5-7'>5-7 години</SelectItem>
                  <SelectItem value='8-12'>8-12 години</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Възрастовата група ще определи стила и сложността на текста.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='coverStyle'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Стил на корицата</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Изберете стил' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='cartoon'>Анимационен</SelectItem>
                  <SelectItem value='watercolor'>Акварел</SelectItem>
                  <SelectItem value='3d'>3D Илюстрация</SelectItem>
                  <SelectItem value='sketch'>Скица</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Стилът ще определи визуалния вид на корицата и илюстрациите.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full bg-gradient-to-r from-blue-600 to-indigo-600'
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Създаване...
            </>
          ) : (
            <>
              <BookOpen className='mr-2 h-4 w-4' />
              Създай Книга
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
