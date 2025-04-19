import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated login function
  async function login(email: string, password: string) {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Mock validation - in a real app, this would be server-side
        if (email && password) {
          setUser({
            id: '1',
            email,
            name: 'Aqua User',
          });
        }
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  }

  function logout() {
    setUser(null);
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}