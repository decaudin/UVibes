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
                    throw new Error(errorData?.errorcode ?? "contactUnexpectedError");
                } else {
                    throw new Error("contactServerUnexpectedResponse");
                }
            }

            return await response.json();

        } catch (error) {
            if (error instanceof TypeError) {
                throw new Error("contactNetworkError");
            }

            throw error instanceof Error ? error : new Error("contactUnexpectedError");
        }
    }

    return { postData };
};