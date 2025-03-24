'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userName: string;
  userAvatar: string;
  login: () => void;
  logout: () => void;
}

const defaultContext: AuthContextType = {
  isLoggedIn: false,
  userName: '',
  userAvatar: '',
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

  // Проверяваме дали потребителят е логнат при инициализиране
  useEffect(() => {
    // В реалността тук ще проверявате сесията в Supabase или друга система за автентикация
    const checkAuthStatus = () => {
      const storedAuth = localStorage.getItem('auth');
      if (storedAuth) {
        const { isLoggedIn, userName, userAvatar } = JSON.parse(storedAuth);
        setIsLoggedIn(isLoggedIn);
        setUserName(userName || 'Потребител');
        setUserAvatar(userAvatar || '/placeholder-avatar.jpg');
      }
    };

    // Проверяваме само в браузъра, не по време на SSR
    if (typeof window !== 'undefined') {
      checkAuthStatus();
    }
  }, []);

  // Функция за логване
  const login = () => {
    // В реалността тук ще имате истинска автентикация
    setIsLoggedIn(true);
    setUserName('Пример Потребителев');
    setUserAvatar('/placeholder-avatar.jpg');

    // Запазваме в localStorage за персистентност
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          isLoggedIn: true,
          userName: 'Пример Потребителев',
          userAvatar: '/placeholder-avatar.jpg',
        })
      );
    }
  };

  // Функция за излизане
  const logout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserAvatar('');

    // Изчистваме localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth');
    }
  };

  const value = {
    isLoggedIn,
    userName,
    userAvatar,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
