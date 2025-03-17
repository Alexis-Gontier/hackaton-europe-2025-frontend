"use client";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(loginData.username, loginData.password);
  };

  return (
    <div>
      <h1>Connexion</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={loginData.username}
          onChange={handleLoginChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={loginData.password}
          onChange={handleLoginChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Chargement..." : "Se connecter"}
        </button>
      </form>
      <p>
        Pas de compte ? <Link href="/register">Inscrivez-vous</Link>
      </p>
    </div>
  );
}
