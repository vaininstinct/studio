
'use client';

import React, { createContext, useContext, useState, type ReactNode } from 'react';
// We are not using the real User type for the mock
// import { onAuthStateChanged, type User } from 'firebase/auth';
// import { auth } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

// Mock User type and object
interface MockUser {
  uid: string;
  email: string;
  displayName: string;
}

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a mock user to bypass login
const mockUser: MockUser = {
  uid: 'mock-user-123',
  email: 'test@example.com',
  displayName: 'Test User',
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // We'll use the mock user and set loading to false immediately
  const [user] = useState<MockUser | null>(mockUser);
  const [loading] = useState(false);

  // The real useEffect for Firebase is commented out for now.
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //     setLoading(false);
  //   });
  //   return () => unsubscribe();
  // }, []);

  if (loading) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Skeleton className="h-24 w-24 rounded-full" />
        </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  // We cast the context to treat MockUser as the User type expected by the app
  return context as { user: any; loading: boolean };
};
