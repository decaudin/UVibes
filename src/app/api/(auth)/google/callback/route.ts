import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { createAuthResponse } from "@/lib/createAuthResponse";
import User from "@/models/User";

export async function GET(req: NextRequest) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const clientId = process.env.GOOGLE_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

        if (!baseUrl || !clientId || !clientSecret) {
            console.error("Google OAuth config missing");
            return NextResponse.json({ code: "OAUTH_CONFIGURATION_MISSING" }, { status: 500 });
        }

        const url = new URL(req.url);
        const code = url.searchParams.get("code");

        if (!code) return NextResponse.json({ code: "MISSING_CODE" }, { status: 400 });

        const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: `${baseUrl}/api/google/callback`,
                grant_type: "authorization_code",
            }),
        });

        const tokenData = await tokenRes.json();
        
        if (!tokenData.access_token) {
            console.error("Invalid Token Google :", tokenData);
            return NextResponse.json({ code: "INVALID_TOKEN" }, { status: 500 });
        }

        const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });

        const userInfo = await userRes.json();
        const { email, name } = userInfo;

        await connectToDatabase();

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ email, name, isOAuth: true });
        } else {
            user.name = name;
            await user.save();
        }

        return createAuthResponse(user, true, true, baseUrl);
    } catch (error) {
        console.error("Google OAuth callback error:", error);
        return NextResponse.json({ code: "OAUTH_CALLBACK_ERROR" }, { status: 500 });
    }
}