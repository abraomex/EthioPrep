import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { apiClient, type ApiUser } from '../apiClient';
import type { Stream, Language } from '../../../../shared/types';

interface AuthContextType {
  user: ApiUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<ApiUser>;
  register: (data: {
    email: string;
    password: string;
    displayName: string;
    stream: Stream;
    preferredLanguage: Language;
  }) => Promise<ApiUser>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateStream: (stream: Stream) => void;
  upgradeToPremium: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await apiClient.auth.getMe();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(async (email: string, password: string): Promise<ApiUser> => {
    setIsLoading(true);
    try {
      const result = await apiClient.auth.login({ email, password });
      setUser(result.user);
      return result.user;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (data: {
      email: string;
      password: string;
      displayName: string;
      stream: Stream;
      preferredLanguage: Language;
    }): Promise<ApiUser> => {
      setIsLoading(true);
      try {
        const result = await apiClient.auth.register(data);
        setUser(result.user);
        return result.user;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await apiClient.auth.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateStream = useCallback((stream: Stream) => {
    setUser((prev) => (prev ? { ...prev, stream } : null));
  }, []);

  const upgradeToPremium = useCallback(() => {
    setUser((prev) => (prev ? { ...prev, accessTier: 'premium' } : null));
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    refreshUser,
    updateStream,
    upgradeToPremium,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
