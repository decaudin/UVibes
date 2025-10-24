import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const refreshToken = req.cookies.get("refreshToken")?.value;

        if (refreshToken) {
            await User.updateOne(
                { "refreshTokens.token": refreshToken },
                { $pull: { refreshTokens: { token: refreshToken } } }
            )
        }

        const response = NextResponse.json({ code: "LOGGED_OUT" });

        const cookieOptions = {
            httpOnly: true,
            path: "/",
            maxAge: 0
        };

        response.cookies.set("token", "", cookieOptions);
        response.cookies.set("refreshToken", "", cookieOptions);

        return response;
    } catch (error) {
        console.error("[LOGOUT_ERROR]", error);
        return NextResponse.json({ code: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}