/**
 * @module hooks/useAuth
 * @description Hook personnalisé pour gérer l'authentification des utilisateurs.
 *
 * Ce hook fournit toutes les fonctionnalités nécessaires pour l'authentification :
 * - Inscription d'un nouvel utilisateur
 * - Connexion d'un utilisateur existant
 * - Déconnexion
 *
 * @example
 * // Importation du hook
 * import useAuth from '@/hooks/useAuth';
 *
 * // Utilisation dans un composant
 * function LoginPage() {
 *   const { login, loading, error } = useAuth();
 *
 *   const handleSubmit = async (e) => {
 *     e.preventDefault();
 *     try {
 *       await login(username, password);
 *       // Redirection automatique vers /test en cas de succès
 *     } catch (err) {
 *       // L'erreur est déjà gérée dans le hook
 *     }
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       {error && <p className="error">{error}</p>}
 *       <button type="submit" disabled={loading}>
 *         {loading ? 'Chargement...' : 'Se connecter'}
 *       </button>
 *     </form>
 *   );
 * }
 *
 * @returns {Object} Fonctions et états liés à l'authentification.
 * @property {boolean} loading - Indique si une opération d'authentification est en cours.
 * @property {string|null} error - Message d'erreur si l'opération a échoué, null sinon.
 * @property {Function} register - Fonction pour inscrire un nouvel utilisateur.
 * @property {Function} login - Fonction pour connecter un utilisateur.
 * @property {Function} logout - Fonction pour déconnecter l'utilisateur actuel.
 */

/**
 * @typedef {Object} RegisterData
 * @property {string} username - Nom d'utilisateur.
 * @property {string} firstname - Prénom.
 * @property {string} name - Nom de famille.
 * @property {string} email - Adresse email.
 * @property {string} password - Mot de passe.
 * @property {boolean} consent - Consentement aux conditions d'utilisation.
 * @property {string} role - Rôle de l'utilisateur.
 */

"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import localforage from "localforage";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Hook personnalisé pour gérer l'authentification des utilisateurs.
 *
 * @returns {Object} Fonctions et états liés à l'authentification.
 */
export default function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fonction d'inscription d'un nouvel utilisateur.
   *
   * @async
   * @param {RegisterData} data - Données d'inscription de l'utilisateur.
   * @throws {Error} Si l'inscription échoue.
   * @returns {Promise<void>} Promise qui se résout lorsque l'inscription est réussie.
   *
   * @example
   * const { register } = useAuth();
   *
   * await register({
   *   username: 'johndoe',
   *   firstname: 'John',
   *   name: 'Doe',
   *   email: 'john@example.com',
   *   password: 'password123',
   *   consent: true,
   *   role: 'user'
   * });
   */
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
      toast(err.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  /**
   * Fonction de connexion d'un utilisateur.
   *
   * @async
   * @param {string} username - Nom d'utilisateur.
   * @param {string} password - Mot de passe.
   * @throws {Error} Si la connexion échoue.
   * @returns {Promise<void>} Promise qui se résout lorsque la connexion est réussie.
   *
   * @example
   * const { login } = useAuth();
   *
   * try {
   *   await login('johndoe', 'password123');
   * } catch (err) {
   *   console.error('Erreur de connexion:', err.message);
   * }
   */
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

      await localforage.setItem("access_token", data.access_token);
      router.push("/");
      toast("Connexion réussie");
    } catch (err: any) {
      toast(err.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  /**
   * Fonction de déconnexion de l'utilisateur actuel.
   *
   * @async
   * @returns {Promise<void>} Promise qui se résout lorsque la déconnexion est réussie.
   *
   * @example
   * const { logout } = useAuth();
   *
   * const handleLogout = () => {
   *   logout();
   * };
   */
  async function logout() {
    await localforage.removeItem("access_token");
    toast("Déconnexion réussie");
    router.push("/login");
  }

  return {
    loading,
    error,
    register,
    login,
    logout,
  };
}
