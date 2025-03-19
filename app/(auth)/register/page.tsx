"use client";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

export default function RegisterPage() {
  const { register, loading, error } = useAuth();
  const [registerData, setRegisterData] = useState({
    username: "",
    firstname: "",
    name: "",
    email: "",
    password: "",
    consent: false,
    role: "user",
  });

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(registerData);
  };

  return (
    <div>
      <h1>Inscription</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nom d&apos;utilisateur"
          value={registerData.username}
          onChange={handleRegisterChange}
          required
        />
        <input
          type="text"
          name="firstname"
          placeholder="Prénom"
          value={registerData.firstname}
          onChange={handleRegisterChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={registerData.name}
          onChange={handleRegisterChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={registerData.email}
          onChange={handleRegisterChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={registerData.password}
          onChange={handleRegisterChange}
          required
        />
        <label>
          <input
            type="checkbox"
            name="consent"
            checked={registerData.consent}
            onChange={handleRegisterChange}
          />
          J&apos;accepte les conditions d&apos;utilisation
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Chargement..." : "S&apos;inscrire"}
        </button>
      </form>
      <p>
        Vous avez déjà un compte ? <Link href="/login">Connectez-vous</Link>
      </p>
      <Link href={"/privacy"}>
        Privacy Policy
      </Link>
    </div>
  );
}
