"use client"

import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  const addToken = () => {
    localStorage.setItem('access_token', 'Hello, this is a message!');
    setMessage('ajouté');
  };

  const removeToken = () => {
    localStorage.removeItem('access_token');
    setMessage('enlevé');
  };

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      <button onClick={addToken}>Add Token</button>
      <button onClick={removeToken}>remove Token</button>
      <p>{message}</p>
    </div>
  );
}
