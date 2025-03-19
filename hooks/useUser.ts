import { useState } from "react";
import { useRouter } from "next/navigation";
import localforage from 'localforage';
import { toast } from "sonner"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function useAuth() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function getAllUsers() {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/users`);
            const data = await response.json();
            return data;
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    async function getUserById(id: string) {
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

    async function updateUser(id: string, data: any) {
        setLoading(true);
        setError(null);

        
    }

    async function deleteUser(id: string) {
    }

    return {
        loading,
        error,
        getAllUsers,
        getUserById,
        updateUser,
        deleteUser,
    };
}
