import { createClient } from '@supabase/supabase-js';

// Тези стойности биха били реални в истинска имплементация
// или взети от средата чрез process.env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Инициализация на Supabase клиент
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

// Примерни функции за автентикация
export async function signIn(email: string, password: string) {
  try {
    // Използваме password за да проверим дали е валиден (в реалния случай)
    const isValidPassword = password && password.length >= 6;

    if (!isValidPassword) {
      return {
        data: null,
        error: { message: 'Невалидна парола' },
      };
    }

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
    // Използваме userId за симулиране на различни книги за различни потребители
    const userIdSuffix = userId.split('-').pop() || '123';
    const booksCount = (parseInt(userIdSuffix) % 5) + 1; // 1-5 книги в зависимост от потребителя

    // Генерираме до 5 примерни книги
    const books = [];
    for (let i = 0; i < booksCount; i++) {
      books.push({
        id: `book-${i}-${userId}`,
        title: `Примерна книга ${i + 1}`,
        coverUrl: `/placeholder-book-cover-${(i % 3) + 1}.jpg`,
        createdAt: new Date(Date.now() - i * 86400000).toLocaleDateString(
          'bg-BG'
        ), // Последните n дни
        ageRange: i % 3 === 0 ? '2-4' : i % 3 === 1 ? '5-7' : '8-12',
      });
    }

    // Фиктивен успешен отговор за целите на демото
    return {
      data: books,
      error: null,
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    return { data: null, error };
  }
}

export async function createBook(
  userId: string,
  bookData: Record<string, unknown>
) {
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
    // В реалността тук ще проверим дали книгата съществува и принадлежи на потребителя
    const isValid = bookId.startsWith('book-');

    if (!isValid) {
      return {
        error: {
          message: `Книга с ID ${bookId} не съществува или нямате права за изтриването й.`,
        },
      };
    }

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
