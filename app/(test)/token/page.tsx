"use client"

import localforage from 'localforage';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [message, setMessage] = useState('');

  async function addToken() {
    await localforage.setItem('access_token', 'Hello, this is a message!')
    setMessage('ajouté')
  }

  async function removeToken() {
    await localforage.removeItem('access_token')
    setMessage('enlevé')
  }

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      <button onClick={addToken}>Add Token</button>
      <button onClick={removeToken}>remove Token</button>
      <p>{message}</p>


      <p>Link Page:<Link href="/carousel">Carousel</Link></p>
    </div>
  );
}
