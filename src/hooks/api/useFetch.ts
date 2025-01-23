import { useState } from "react";

interface FetchResult<T> {
    fetchData: (url: string) => Promise<T | undefined>;
    isLoading: boolean;
    error: string | null;
}

export const useFetch = <T>(): FetchResult<T> => {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (url: string): Promise<T | undefined> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
              method: "GET",
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            const result: T = await response.json();
            return result;
        } catch (err: unknown) {
              if (err instanceof Error) {
                setError(err.message);
              } else {
                setError("Une erreur inconnue s'est produite");
              }
              return undefined;
        } finally {
              setIsLoading(false);
        }
    };

    return { fetchData, isLoading, error };
};