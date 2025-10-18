import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getJwtSecret } from "@/lib/env";
import { connectToDatabase } from "@/lib/mongodb";
import { signInSchema } from '@/lib/schemas/authSchema';
import User from "@/models/User";

const JWT_SECRET = getJwtSecret();

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

        const jwtExpiry = isRememberMe ? 60 * 60 * 24 * 7 : 60 * 60;

        const cookieMaxAge = isRememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7;

        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: jwtExpiry }
        );

        const response = NextResponse.json({ code: "SUCCESS" });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: cookieMaxAge
        });

        return response;

    } catch (error) {
        console.error("[SIGNIN_ERROR]", error);
        return NextResponse.json({ code: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}