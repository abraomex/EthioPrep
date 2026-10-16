import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, UserRole, Stream, Language } from '../../../../shared/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  updateStream: (stream: Stream) => void;
  updateLanguage: (lang: Language) => void;
  upgradeToPremium: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_AUTH_KEY = 'ethioprep_mock_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(STORAGE_AUTH_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_AUTH_KEY);
    }
  }, [user]);

  const login = (email: string, role: UserRole = 'student') => {
    const newUser: User = {
      id: 'demo-user-1',
      email,
      displayName: email.split('@')[0] || 'Demo Student',
      role,
      stream: 'natural_science',
      preferredLanguage: 'en',
      accessTier: 'free',
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateStream = (stream: Stream) => {
    if (user) {
      setUser({ ...user, stream });
    }
  };

  const updateLanguage = (preferredLanguage: Language) => {
    if (user) {
      setUser({ ...user, preferredLanguage });
    }
  };

  const upgradeToPremium = () => {
    if (user) {
      setUser({ ...user, accessTier: 'premium' });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
        updateStream,
        updateLanguage,
        upgradeToPremium,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
