import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/mongodb";
import { sendResetPasswordEmail } from "@/lib/email";
import User from "@/models/User";
import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const body = await req.json();
        const parsed = resetPasswordSchema.safeParse(body);

        if (!parsed.success) return NextResponse.json({ errors: parsed.error.format() }, { status: 400 });

        const { email, locale } = parsed.data;

        const user = await User.findOne({ email });

        if (!user) return NextResponse.json({ code: "RESET_LINK_SENT" });

        const token = crypto.randomBytes(32).toString("hex");
        const tokenExpiry = new Date(Date.now() + 1000 * 60 * 60);

        user.resetPasswordToken = token;
        user.resetPasswordExpires = tokenExpiry;
        await user.save();

        const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;

        await sendResetPasswordEmail(user.email, resetLink, user.name, locale);

        return NextResponse.json({ code: "RESET_LINK_SENT" });

    } catch (error) {
        console.error("[RESET_PASSWORD_ERROR]", error);
        return NextResponse.json({ code: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}