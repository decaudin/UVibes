import type { NextRequest } from "next/server"; 
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getUserIdFromRequest } from "@/lib/auth";
import User from "@/models/User";

export async function PATCH(req: NextRequest) {
    try {
        await connectToDatabase();

        const result = getUserIdFromRequest(req);
        
        if (result.error) return result.error;

        const { skinType } = await req.json();
        
        if (skinType !== null && (skinType < 1 || skinType > 6)) return NextResponse.json({ code: "INVALID_SKIN_TYPE" }, { status: 400 });

        const existingUser = await User.findById(result.userId).select("skinType");
        
        if (!existingUser) return NextResponse.json({ code: "USER_NOT_FOUND" }, { status: 404 });

        if (existingUser.skinType !== skinType) {
            existingUser.skinType = skinType;
            await existingUser.save();
        }

        return NextResponse.json(existingUser);

    } catch (error) {
        console.error("[PATCH_SKINTYPE_ERROR]", error);
        return NextResponse.json({ code: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}