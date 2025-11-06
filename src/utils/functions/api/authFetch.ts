export const authFetch = async (input: RequestInfo, init?: RequestInit) => {

    let res = await fetch(input, { ...init, credentials: "include" });

    if (res.status === 401) {
        const refreshRes = await fetch("/api/refresh-token", {
            method: "POST",
            credentials: "include",
        });

        if (refreshRes.ok) {
            res = await fetch(input, { ...init, credentials: "include" });
        } else {
            res = refreshRes;
        }
    }

    return res
}