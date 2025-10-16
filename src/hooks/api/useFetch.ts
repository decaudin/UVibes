import { useState, useCallback } from "react";

interface UseFetchError {
    code?: string;
    message?: string;
}

interface FetchResult<T> {
    fetchData: (url: string) => Promise<T | undefined>;
    isLoading: boolean;
    error: UseFetchError | null;
}

export const useFetch = <T>(): FetchResult<T> => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<UseFetchError | null>(null);

    const fetchData = useCallback(async (url: string): Promise<T | undefined> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(url, { method: "GET" });

            const result = await response.json();

            if (!response.ok) {
                setError({
                    code: result?.code ?? `HTTP_${response.status}`,
                    message: result?.message ?? `HTTP Error: ${response.status}`,
                });
                return undefined;
            }

            return result;
        } catch (err: unknown) {
            if (err instanceof Error) setError({ message: err.message });
            else setError({ message: "An unknown error has occurred" });
            return undefined;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { fetchData, isLoading, error }
}