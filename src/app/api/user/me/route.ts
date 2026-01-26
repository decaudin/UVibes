import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getUserIdFromRequest } from "@/lib/auth";
import User from "@/models/User";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const result = getUserIdFromRequest(req);
        
        if (result.error) return result.error;

        const user = await User.findById(result.userId).select("name skinType password");

        if (!user) return NextResponse.json({ code: "USER_NOT_FOUND" }, { status: 404 });

        const userObj = user.toObject();

        userObj.hasPassword = Boolean(userObj.password);
        delete userObj.password;

        return NextResponse.json({ user: userObj });

    } catch (error) {
        console.error("[USER_ME_ERROR]", error);
        return NextResponse.json({ code: "INVALID_TOKEN" }, { status: 401 });
    }
}