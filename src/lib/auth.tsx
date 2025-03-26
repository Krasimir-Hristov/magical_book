'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { createClientSide } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  isLoggedIn: boolean;
  userName: string;
  userAvatar: string;
  user: User | null;
  login: () => void;
  logout: () => void;
}

const defaultContext: AuthContextType = {
  isLoggedIn: false,
  userName: '',
  userAvatar: '',
  user: null,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const supabase = createClientSide();

  // Проверяваме дали потребителят е логнат при инициализиране
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Проверка на сесията чрез Supabase
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('Грешка при проверка на сесията:', error.message);
          return;
        }

        if (session) {
          setIsLoggedIn(true);
          setUser(session.user);

          // Извличане на потребителско име от потребителските метаданни
          const displayName =
            session.user.user_metadata?.full_name ||
            session.user.user_metadata?.name ||
            'Потребител';
          setUserName(displayName);

          // Извличане на аватар от потребителските метаданни
          const avatar =
            session.user.user_metadata?.avatar_url ||
            session.user.user_metadata?.picture ||
            '/placeholder-avatar.jpg';
          setUserAvatar(avatar);
        }
      } catch (error) {
        console.error('Грешка при проверка на сесията:', error);
      }
    };

    // Проверяваме само в браузъра, не по време на SSR
    if (typeof window !== 'undefined') {
      checkAuthStatus();

      // Настройка на слушател за промени в автентикацията
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setIsLoggedIn(true);
          setUser(session.user);

          const displayName =
            session.user.user_metadata?.full_name ||
            session.user.user_metadata?.name ||
            'Потребител';
          setUserName(displayName);

          const avatar =
            session.user.user_metadata?.avatar_url ||
            session.user.user_metadata?.picture ||
            '/placeholder-avatar.jpg';
          setUserAvatar(avatar);
        }

        if (event === 'SIGNED_OUT') {
          setIsLoggedIn(false);
          setUserName('');
          setUserAvatar('');
          setUser(null);
        }
      });

      // Почистване на слушателя при размонтиране
      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  // Функция за логване
  const login = async () => {
    // Тази функция може да се използва за други методи за вход,
    // но за Google вход използваме директно компонента GoogleAuthComponent
    console.log('Използвайте компонента за Google вход');
  };

  // Функция за излизане
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Грешка при излизане:', error.message);
      } else {
        setIsLoggedIn(false);
        setUserName('');
        setUserAvatar('');
        setUser(null);
      }
    } catch (error) {
      console.error('Грешка при излизане:', error);
    }
  };

  const value = {
    isLoggedIn,
    userName,
    userAvatar,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
