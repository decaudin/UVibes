import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "@/lib/env";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

const JWT_SECRET = getJwtSecret();

export async function PATCH(req: NextRequest) {
    try {
        await connectToDatabase();

        const token = req.cookies.get("token")?.value;
        
        if (!token) return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 });

        let payload: { userId: string };
        
        try {
            payload = jwt.verify(token, JWT_SECRET) as { userId: string };
        } catch (err) {
            console.error("JWT verification failed:", err);
            return NextResponse.json({ code: "INVALID_TOKEN" }, { status: 401 });
        }

        const { skinType } = await req.json();
        
        if (skinType !== null && (skinType < 1 || skinType > 6)) {
            return NextResponse.json({ code: "INVALID_SKIN_TYPE" }, { status: 400 });
        }

        const existingUser = await User.findById(payload.userId).select("skinType");
        
        if (!existingUser) return NextResponse.json({ code: "USER_NOT_FOUND" }, { status: 404 });

        if (existingUser.skinType !== skinType) {
            existingUser.skinType = skinType;
            await existingUser.save();
        }

        return NextResponse.json(existingUser);

    } catch (error) {
        console.error("[PATCH_SKINTYPE_ERROR]", error);
        return NextResponse.json({ code: "SERVER_ERROR" }, { status: 500 });
    }
}