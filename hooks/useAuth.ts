import { useState } from "react";
import { useRouter } from "next/navigation";
import localforage from 'localforage';
import { toast } from "sonner"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function register(data: {
    username: string;
    firstname: string;
    name: string;
    email: string;
    password: string;
    consent: boolean;
    role: string;
  }) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Échec de l'inscription");
      }
      router.push("/login");
      toast("Inscription réussie, veuillez vous connecter");
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function login(username: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          grant_type: "password",
          username,
          password,
          scope: "",
          client_id: "",
          client_secret: "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Échec de la connexion");
      }

      await localforage.setItem('access_token', data.access_token);
      router.push("/test");
      toast("Connexion réussie");
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await localforage.removeItem("access_token");
    toast("Déconnexion réussie");
    router.push("/login");
  }

  async function fetchUser(id: string) {
    setLoading(true);
    setError(null);
    try {
      const token = await localforage.getItem("access_token");
      if (!token) {
        throw new Error("Utilisateur non authentifié");
      }
      const response = await fetch(`${API_URL}/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erreur lors de la récupération des données utilisateur");
      }
      const userData = await response.json();
      return userData;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    register,
    login,
    logout,
    fetchUser,
  };
}
