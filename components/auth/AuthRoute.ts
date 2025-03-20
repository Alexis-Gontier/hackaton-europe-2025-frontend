"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import localForage from 'localforage';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function AuthRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isNotAuthenticated, setIsNotAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const token = await localForage.getItem('access_token');
      if (token) {
        router.push('/');
      } else {
        setIsNotAuthenticated(true);
      }
    };

    checkAuth();
  }, [router]);

  if (isNotAuthenticated === null) {
    return null;
  }

  return children
}