"use client"

import React from 'react'
import useAuth from '@/hooks/useUser';

export default function page() {

  const { getAllUsers, loading, error } = useAuth();
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    (async () => {
      const users = await getAllUsers();
      setData(users);
    })();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      <ul>
        {data && data.map((user: any) => (
          <li key={user.id}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}