"use client"

import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';

export default function page() {

  const [token, setToken] = useState<string | null>('');
  const { logout } = useAuth();

  useEffect(() => {
    const t = localStorage.getItem('access_token');
    setToken(t);
  }, [token]);

  const handleLogout = () => {
    logout();
  }


  return (
    <div>
      <p>Token: {token}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
