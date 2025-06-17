interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

export const usePost = () => {

    async function postData(url: string, payload: FormData) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const contentType = response.headers.get("Content-Type") || "";

            if (!response.ok) {
                if (contentType.includes("application/json")) {
                    const errorData = await response.json();
                    throw new Error(errorData?.error ?? "Something went wrong");
                } else {
                    throw new Error("Server returned an unexpected response.");
                }
            }

            return await response.json();

        } catch (error) {
            if (error instanceof TypeError) {
                throw new Error("Network error. Please check your connection.");
            }

            throw error instanceof Error ? error : new Error("An unknown error occurred");
        }
    }

    return { postData };
};