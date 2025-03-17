'use client';

import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import localforage from 'localforage';

export default function Page() {
  const [token, setToken] = useState<string | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    async function fetchToken() {
      const t = await localforage.getItem<string>('access_token')
      setToken(t)
    }

    fetchToken()
  }, [])

  function handleLogout() {
    logout()
  }

  return (
    <div>
      <p>Token: {token}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
