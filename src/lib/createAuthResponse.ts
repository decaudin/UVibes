import type { IUser } from "@/models/User";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { getJwtSecret } from "@/lib/env";

const JWT_SECRET = getJwtSecret();

export const createAuthResponse = async (user: IUser, isRememberMe = false, isPopup = false, baseUrl?: string) => {
    
    const jwtExpiry = isRememberMe ? 60 * 60 * 24 * 7 : 60 * 60;
    const cookieMaxAge = isRememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7;
    
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: jwtExpiry });
    const refreshToken = crypto.randomBytes(64).toString("hex");

    user.refreshTokens.push({
        token: refreshToken,
        expiresAt: new Date(Date.now() + cookieMaxAge * 1000),
        isRememberMe
    });

    await user.save();

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
        maxAge: cookieMaxAge,
    };

    let response: NextResponse;

    if (isPopup && baseUrl) {
        response = new NextResponse(
            `<html>
                <body>
                    <script>
                        window.opener.postMessage({ type: "google-auth-success" }, "${baseUrl}");
                        window.close();
                    </script>
                </body>
            </html>`,
            { headers: { "Content-Type": "text/html" } }
        );
    } else {
        response = NextResponse.json({ code: "SUCCESS" });
    }

    response.cookies.set("token", token, cookieOptions);
    response.cookies.set("refreshToken", refreshToken, cookieOptions);

    return response
}