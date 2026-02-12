import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { getUserIdFromRequest } from "@/lib/auth";
import { deleteUserAccount } from "@/lib/deleteAccount";
import { deleteAccountSchema } from "@/schemas/deleteAccountSchema";
import User from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const { userId, error } = getUserIdFromRequest(req);
        if (error) return error;

        const body = await req.json();
        const parsed = deleteAccountSchema.safeParse(body);

        if (!parsed.success) return NextResponse.json({ errors: parsed.error.format() }, { status: 400 });

        const { password } = parsed.data;

        const user = await User.findById(userId).select("+password");

        if (!user) return NextResponse.json({ code: "USER_NOT_FOUND" }, { status: 404 });

        if (!user.password) return NextResponse.json({ code: "PASSWORD_NOT_SET" }, { status: 400 });

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return NextResponse.json({ code: "INVALID_PASSWORD" }, { status: 400 });
        
        return await deleteUserAccount(user);

    } catch (error) {
        console.error("[DELETE_ACCOUNT_ERROR]", error);
        return NextResponse.json({ code: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}