import { useCallback, useEffect, useState } from "react";
import type { ObjectOrArray } from "../types/missingTypes";

export type FetchedState<T extends ObjectOrArray> = {
  data: T;
  error: string | null;
  isLoading: boolean;
};

/**
 * `useFetch` Accepts a url as a parameter and returns an object containing the fetched data, an error state, an a loading state.
 * @template {ObjectOrArray} T The type of data we are getting back. It must be either an object or an array.
 * @param {string} url The url to fetch data from.
 * @param {RequestInit} init An optional init object that allows you to control a number of different settings.
 * @returns {FetchedState<T>} An object containing the fetched data, an error state, and a loading state.
 */
const useFetch = <T extends ObjectOrArray>(
  url: string,
  init: RequestInit = {}
): FetchedState<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T>({} as T);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url, init).catch((fetchError: TypeError) => {
        throw new Error(fetchError.message);
      });
      if (!response.ok) {
        const errorMessage = `Response failed status code: ${response.status}`;
        setIsLoading(false);
        setError(errorMessage);
        throw new Error(errorMessage);
      }
      const responseData = (await response.json()) as T;
      setIsLoading(false);
      setData(responseData);
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      }
      console.error(err);
    }
  }, [init, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, isLoading };
};

export default useFetch;
