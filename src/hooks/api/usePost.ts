"use client";
import { useState } from "react";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

export const usePost = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState(null);

    async function postData(url: string, payload: FormData) {
        
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Something went wrong");
            }

            const result = await response.json();
            setData(result);
            return result;
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
                console.error("Error posting data:", err);
            } else {
                console.error("Unexpected error:", err);
                setError("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, error, data, postData };
}