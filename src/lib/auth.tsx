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
  logout: () => void;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const defaultContext: AuthContextType = {
  isLoggedIn: false,
  userName: '',
  userAvatar: '',
  user: null,
  logout: () => {},
  isLoading: true,
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClientSide();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
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

          // Извличане на потребителско име
          const displayName =
            session.user.user_metadata?.full_name ||
            session.user.user_metadata?.name ||
            'Потребител';
          setUserName(displayName);

          // Извличане на аватар
          const avatar =
            session.user.user_metadata?.avatar_url ||
            session.user.user_metadata?.picture ||
            '/placeholder-avatar.jpg';
          setUserAvatar(avatar);
        }
      } catch (error) {
        console.error('Грешка при проверка на сесията:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();

    // Слушател за промени в автентикацията
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

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Функция за излизане
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Грешка при излизане:', error.message);
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
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
