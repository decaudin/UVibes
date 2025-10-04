import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "@/lib/env";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

const JWT_SECRET = getJwtSecret();

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const token = req.cookies.get("token")?.value;

        if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const payload = jwt.verify(token, JWT_SECRET) as { userId: string };

        const user = await User.findById(payload.userId).select("name email skinType");

        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

        return NextResponse.json({ user });

    } catch (error) {
        console.error("[USER_ME_ERROR]", error);
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
}