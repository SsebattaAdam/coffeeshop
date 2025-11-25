import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    try {
      // TODO: Implement your session check logic here
      // For now, setting to null
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking user session:', error);
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // TODO: Implement your login logic here
      // For demo purposes, creating a mock user
      const mockUser: User = {
        id: '1',
        email: email,
        name: 'User',
      };
      setUser(mockUser);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    try {
      setIsLoading(true);
      // TODO: Implement your signup logic here
      const mockUser: User = {
        id: '1',
        email: email,
        name: name || 'User',
      };
      setUser(mockUser);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement your logout logic here
      setUser(null);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{user, isLoading, login, logout, signup}}>
      {children}
    </AuthContext.Provider>
  );
};

export const userAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('userAuth must be used within an AuthProvider');
  }
  return context;
};

