import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import { signUpSchema } from '@/lib/schemas/authSchema';
import User from '@/models/User';

export async function POST(request: Request) {
    try {
        await connectToDatabase();

        const body = await request.json();
        const parsed = signUpSchema.safeParse(body);

        if (!parsed.success) return NextResponse.json({ errors: parsed.error.format() }, { status: 400 });

        const { email, password, name } = parsed.data;

        const userExists = await User.findOne({ email });
        
        if (userExists) return NextResponse.json({ code: "USER_ALREADY_EXISTS" }, { status: 400 });

        let hashedPassword: string;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (hashError) {
            console.error("Error hashing password:", hashError);
            return NextResponse.json({ code: "HASHING_ERROR" }, { status: 500 });
        }

        const newUser = await User.create({ email, password: hashedPassword, name });

        return NextResponse.json({ code: "USER_CREATED", userId: newUser._id }, { status: 201 });
    } catch (error: unknown) {
        console.error("Error in sign-up:", error);
        return NextResponse.json({ code: "USER_CREATION_ERROR" }, { status: 500 });
    }
}