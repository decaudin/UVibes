import type { NextRequest } from "next/server";
import type { IUser } from "@/models/User";
import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from 'bcryptjs';
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { resetPasswordFormSchema } from "@/schemas/resetPasswordFormSchema";
import { passwordSchema } from "@/schemas/commonUserSchemas";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const body = await req.json();

        const parsed = resetPasswordFormSchema.safeParse(body);
        
        if (!parsed.success) return NextResponse.json({ errors: parsed.error.format() }, { status: 400 });

        const { password, confirmPassword, token } = parsed.data;

        if (password !== confirmPassword) return NextResponse.json({ code: "PASSWORDS_DO_NOT_MATCH" }, { status: 400 });

        const passwordValidation = passwordSchema.safeParse(password);

        if (!passwordValidation.success) return NextResponse.json({ code: "PASSWORD_INVALID", errors: passwordValidation.error.format() }, { status: 400 });

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user: IUser | null = await User.findOne(
            { resetPasswordTokens: { $elemMatch: { token: hashedToken, expiresAt: { $gt: new Date() }}}},
            { resetPasswordTokens: 1 }
        );

        if (!user) return NextResponse.json({ code: "INVALID_OR_EXPIRED_TOKEN" }, { status: 400 });

        const tokenIndex = user.resetPasswordTokens.findIndex(t => t.token === hashedToken && t.expiresAt.getTime() > Date.now());

        if (tokenIndex === -1) return NextResponse.json({ code: "INVALID_OR_EXPIRED_TOKEN" }, { status: 400 });

        user.resetPasswordTokens.splice(tokenIndex, 1);

        try {
            user.password = await bcrypt.hash(password, 10);
        } catch (hashError) {
            console.error("[HASHING_ERROR]", hashError);
            return NextResponse.json({ code: "HASHING_ERROR" }, { status: 500 });
        }

        await user.save();

        return NextResponse.json({ code: "PASSWORD_RESET_SUCCESS" });

    } catch (error) {
        console.error("[RESET_PASSWORD_TOKEN_ERROR]", error);
        return NextResponse.json({ code: "RESET_PASSWORD_TOKEN_ERROR" }, { status: 500 });
    }
}