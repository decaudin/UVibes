import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { createAuthResponse } from "@/lib/createAuthResponse";
import { signInSchema } from '@/schemas/authSchema';
import User from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const body = await req.json();
        const parsed = signInSchema.safeParse(body);

        if (!parsed.success) return NextResponse.json({ errors: parsed.error.format() }, { status: 400 });

        const { email, password, isRememberMe } = parsed.data;

        const user = await User.findOne({ email }).select('+password');

        if (!user) return NextResponse.json({ code: "INVALID_CREDENTIALS" }, { status: 401 });

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) return NextResponse.json({ code: "INVALID_CREDENTIALS" }, { status: 401 });

        return createAuthResponse(user, isRememberMe);
    } catch (error) {
        console.error("[SIGNIN_ERROR]", error);
        return NextResponse.json({ code: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}