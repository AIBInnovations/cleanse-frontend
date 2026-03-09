"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Lightweight data-fetching hook.
 *
 * @param {Function} fetchFn - Async function that returns data (e.g. () => productApi.getAll())
 * @param {Array} deps - Dependency array to re-fetch when values change
 * @param {Object} options - { immediate: true } to fetch on mount
 * @returns {{ data, loading, error, refetch }}
 */
export default function useApi(fetchFn, deps = [], options = {}) {
  const { immediate = true } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      if (mountedRef.current) {
        setData(result);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err.response?.data?.message || err.message || "Something went wrong");
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    mountedRef.current = true;
    if (immediate) {
      refetch();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [refetch, immediate]);

  return { data, loading, error, refetch, setData };
}
