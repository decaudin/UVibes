import { NextResponse } from "next/server";

export async function GET() {
    try {
        const clientId = process.env.GOOGLE_CLIENT_ID;
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        if (!clientId || !baseUrl) {
            console.error("Google OAuth: clientId or NEXT_PUBLIC_BASE_URL missing");
            return NextResponse.json({ code: "OAUTH_CONFIGURATION_MISSING" }, { status: 500 });
        }

        const redirectUri = `${baseUrl}/api/google/callback`;
        const scope = "openid email profile";
        const responseType = "code";

        const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
        googleAuthUrl.searchParams.set("client_id", clientId);
        googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
        googleAuthUrl.searchParams.set("response_type", responseType);
        googleAuthUrl.searchParams.set("scope", scope);
        googleAuthUrl.searchParams.set("access_type", "offline");
        googleAuthUrl.searchParams.set("prompt", "consent");

        return NextResponse.redirect(googleAuthUrl.toString());
    } catch (error) {
        console.error("Google OAuth redirect error:", error);
        return NextResponse.json({ code: "OAUTH_REDIRECT_ERROR" }, { status: 500 });
    }
}