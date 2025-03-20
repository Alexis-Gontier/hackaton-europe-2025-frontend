import { useCallback, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function useCards() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Memoize the fetchData function
  const fetchData = useCallback(async (url: string, options: RequestInit) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
      return await res.json();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Memoize the getAllFeed function
  const getAllFeed = useCallback(async () => {
    const data = await fetchData(`${API_URL}/feed`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return JSON.stringify(data);
  }, [fetchData]);

  const getFeedById = useCallback(
    async (id: string) =>
      fetchData(`${API_URL}/feed/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    [fetchData]
  );

  const postFeed = useCallback(
    async (data: any) =>
      fetchData(`${API_URL}/feed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    [fetchData]
  );

  const deleteFeed = useCallback(
    async (id: string) =>
      fetchData(`${API_URL}/feed/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }),
    [fetchData]
  );

  const updateFeed = useCallback(
    async (id: string, data: any) =>
      fetchData(`${API_URL}/feed/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    [fetchData]
  );

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
