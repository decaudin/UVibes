import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const clientId = process.env.GOOGLE_CLIENT_ID;
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        if (!clientId || !baseUrl) {
            console.error("Google OAuth: clientId or NEXT_PUBLIC_BASE_URL missing");
            return NextResponse.json({ code: "OAUTH_CONFIGURATION_MISSING" }, { status: 500 });
        }

        const state = req.nextUrl.searchParams.get("state");
        const redirectUri = `${baseUrl}/api/google/callback`;

        const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
        googleAuthUrl.searchParams.set("client_id", clientId);
        googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
        googleAuthUrl.searchParams.set("response_type", "code");
        googleAuthUrl.searchParams.set("scope", "openid email profile");
        googleAuthUrl.searchParams.set("access_type", "offline");
        googleAuthUrl.searchParams.set("prompt", "consent");

        if (state) googleAuthUrl.searchParams.set("state", state);

        return NextResponse.redirect(googleAuthUrl.toString());
    } catch (error) {
        console.error("Google OAuth redirect error:", error);
        return NextResponse.json({ code: "OAUTH_REDIRECT_ERROR" }, { status: 500 });
    }
}