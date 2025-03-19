"use client"

import { useState } from "react";
import localforage from "localforage";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function useUser() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function getAllUsers() {
    setLoading(true);
    setError(null);
    try {
      const token = await localforage.getItem("access_token");
      if (!token) {
        throw new Error("Utilisateur non authentifié");
      }
      const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erreur lors de la récupération des utilisateurs");
      }
      const data = await response.json();
      return data;
    } catch (err: any) {
      setError(err.message);
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
    } finally {
      setLoading(false);
    }
  }

  async function updateUser(id: string, updateData: any) {
    setLoading(true);
    setError(null);
    try {
      const token = await localforage.getItem("access_token");
      if (!token) {
        throw new Error("Utilisateur non authentifié");
      }
      const response = await fetch(`${API_URL}/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erreur lors de la mise à jour de l'utilisateur");
      }
      const updatedUser = await response.json();
      toast("Mise à jour réussie");
      return updatedUser;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser(id: string) {
    setLoading(true);
    setError(null);
    try {
      const token = await localforage.getItem("access_token");
      if (!token) {
        throw new Error("Utilisateur non authentifié");
      }
      const response = await fetch(`${API_URL}/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erreur lors de la suppression de l'utilisateur");
      }
      toast("Utilisateur supprimé avec succès");
      return true;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
