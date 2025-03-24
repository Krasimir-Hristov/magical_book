import { createClient } from '@supabase/supabase-js';

// Тези стойности биха били реални в истинска имплементация
// или взети от средата чрез process.env
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key';

// Инициализация на Supabase клиент
export const supabase = createClient(supabaseUrl, supabaseKey);

// Примерни функции за автентикация
export async function signIn(email: string, password: string) {
  try {
    // Фиктивен успешен отговор за целите на демото
    return {
      data: {
        user: {
          id: 'user-123',
          email: email,
          name: 'Петър Иванов',
        },
        session: {
          access_token: 'fake-token',
          expires_at: Date.now() + 3600 * 1000,
        },
      },
      error: null,
    };
  } catch (error) {
    console.error('Error signing in:', error);
    return { data: null, error };
  }
}

export async function signUp(email: string, password: string, name: string) {
  try {
    // Фиктивен успешен отговор за целите на демото
    return {
      data: {
        user: {
          id: 'user-' + Math.floor(Math.random() * 1000),
          email: email,
          name: name,
        },
      },
      error: null,
    };
  } catch (error) {
    console.error('Error signing up:', error);
    return { data: null, error };
  }
}

export async function signOut() {
  try {
    // Фиктивен успешен отговор за целите на демото
    return { error: null };
  } catch (error) {
    console.error('Error signing out:', error);
    return { error };
  }
}

// Примерни функции за работа с книги
export async function getUserBooks(userId: string) {
  try {
    // Връщане на фиктивни данни за книги за целите на демото
    return {
      data: [
        {
          id: '1',
          title: 'Вълшебното Пътешествие',
          coverImage: '/placeholder-book-cover.jpg',
          ageRange: '5-7',
          createdAt: '24.03.2024',
        },
        {
          id: '2',
          title: 'Приятелите от Гората',
          coverImage: '/placeholder-book-cover.jpg',
          ageRange: '2-4',
          createdAt: '18.03.2024',
        },
        {
          id: '3',
          title: 'Космическото Приключение',
          coverImage: '/placeholder-book-cover.jpg',
          ageRange: '8-12',
          createdAt: '10.03.2024',
        },
      ],
      error: null,
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    return { data: null, error };
  }
}

export async function createBook(userId: string, bookData: any) {
  try {
    // Фиктивен успешен отговор за целите на демото
    return {
      data: {
        id: 'book-' + Math.floor(Math.random() * 1000),
        ...bookData,
        userId,
        createdAt: new Date().toLocaleDateString('bg-BG'),
      },
      error: null,
    };
  } catch (error) {
    console.error('Error creating book:', error);
    return { data: null, error };
  }
}

export async function deleteBook(bookId: string) {
  try {
    // Фиктивен успешен отговор за целите на демото
    return { error: null };
  } catch (error) {
    console.error('Error deleting book:', error);
    return { error };
  }
}

// Примерна функция за добавяне на токени
export async function addTokens(userId: string, amount: number) {
  try {
    // Фиктивен успешен отговор за целите на демото
    return {
      data: {
        tokens: amount,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error adding tokens:', error);
    return { data: null, error };
  }
}
