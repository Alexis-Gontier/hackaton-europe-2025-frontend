"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FeedVotes {
  additionalProp1: number;
  additionalProp2: number;
  additionalProp3: number;
}

interface FeedData {
  id_subject: string;
  short_description: string;
  image: string;
  context: string;
  impact: string[];
  source: string;
  votes: FeedVotes;
}

interface FeedUpdateData {
  votes: FeedVotes;
}

/**
 * Fonction utilitaire pour simplifier les appels fetch.
 */
async function fetchWrapper<T>(url: string, options: RequestInit, setLoading: (value: boolean) => void, setError: (value: string | null) => void): Promise<T> {
  setLoading(true);
  setError(null);
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }
    return await response.json();
  } catch (err: any) {
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
}

export default function useCards() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function getAllFeed(): Promise<string> {
    const data = await fetchWrapper<any>(`${API_URL}/feed`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }, setLoading, setError);
    // Conversion en string si nécessaire
    return JSON.stringify(data);
  }

  async function getFeedById(id: string) {
    return await fetchWrapper<any>(`${API_URL}/feed/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }, setLoading, setError);
  }

  async function postFeed(data: FeedData) {
    return await fetchWrapper<any>(`${API_URL}/feed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }, setLoading, setError);
  }

  async function deleteFeed(id: string) {
    return await fetchWrapper<any>(`${API_URL}/feed/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }, setLoading, setError);
  }

  async function updateFeed(id: string, data: FeedUpdateData) {
    return await fetchWrapper<any>(`${API_URL}/feed/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }, setLoading, setError);
  }

  return {
    loading,
    error,
    getAllFeed,
    getFeedById,
    postFeed,
    deleteFeed,
    updateFeed,
  };
}
