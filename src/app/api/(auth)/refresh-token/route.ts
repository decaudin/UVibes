import type { NextRequest } from "next/server";
import type { IUser } from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { getJwtSecret } from "@/lib/env";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

const JWT_SECRET = getJwtSecret();

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const oldRefreshToken = req.cookies.get("refreshToken")?.value;
        
        if (!oldRefreshToken) return NextResponse.json({ code: "INVALID_TOKEN" }, { status: 401 });

        const user = await User.findOne({
            "refreshTokens.token": oldRefreshToken,
            "refreshTokens.expiresAt": { $gt: new Date() }
        })as IUser | null;

        if (!user) return NextResponse.json({ code: "INVALID_TOKEN" }, { status: 401 });

        const oldTokenData = user.refreshTokens.find(rt => rt.token === oldRefreshToken);
        const isRememberMe = oldTokenData?.isRememberMe ?? false;

        const refreshTokenExpiry = isRememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7;
        const jwtExpiry = isRememberMe ? 60 * 60 * 24 * 7 : 60 * 60;

        const newRefreshToken = crypto.randomBytes(64).toString("hex");
        const newRefreshExpiresAt = new Date(Date.now() + refreshTokenExpiry * 1000);

        user.refreshTokens = user.refreshTokens.filter(rt => rt.expiresAt > new Date() && rt.token !== oldRefreshToken);
        user.refreshTokens.push({ token: newRefreshToken, expiresAt: newRefreshExpiresAt, isRememberMe });
        await user.save();

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: jwtExpiry });

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax" as const,
            path: "/",
            maxAge: refreshTokenExpiry
        };

        const response = NextResponse.json({ code: "SUCCESS" });
        response.cookies.set("token", token, cookieOptions);
        response.cookies.set("refreshToken", newRefreshToken, cookieOptions);

        return response;

    } catch (error) {
        console.error("[REFRESH_TOKEN_ERROR]", error);
        return NextResponse.json({ code: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}