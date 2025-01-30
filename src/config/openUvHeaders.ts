const apiKey = process.env.OPENUV_API_KEY;

if (!apiKey) {
    throw new Error('API_KEY is not defined');
}

const headers = new Headers();
headers.append("x-access-token", apiKey);
headers.append("Content-Type", "application/json");

export default headers;