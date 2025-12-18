import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const { token } = await req.json();
        
        if (!token) return NextResponse.json({ code: "MISSING_TOKEN" }, { status: 400 });

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne(
            { resetPasswordTokens: { $elemMatch: { token: hashedToken, expiresAt: { $gt: new Date() }}}},
            { resetPasswordTokens: 1 }
        );

        if (!user) return NextResponse.json({ code: "INVALID_OR_EXPIRED_TOKEN" }, { status: 400 });

        return NextResponse.json({ code: "TOKEN_VALID" });
    } catch (error) {
        console.error("[CHECK_RESET_TOKEN_ERROR]", error);
        return NextResponse.json({ code: "CHECK_RESET_TOKEN_ERROR" }, { status: 500 });
    }
}