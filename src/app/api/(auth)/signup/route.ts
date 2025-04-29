import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { signUpSchema } from '@/schemas/authschema';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        await connectToDatabase();

        const body = await request.json();
        const parsed = signUpSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ errors: parsed.error.format() }, { status: 400 });
        }

        const { email, password, name } = parsed.data;

        const userExists = await User.findOne({ email });
        
        if (userExists) {
            return NextResponse.json({ message: 'User already exists. Please use a different email.' }, { status: 400 });
        }

        let hashedPassword: string;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (hashError) {
            console.error('Error hashing password:', hashError);
            return NextResponse.json({ message: 'Error hashing password' }, { status: 500 });
        }

        const newUser = await User.create({ email, password: hashedPassword, name });

        return NextResponse.json({ message: 'User created', userId: newUser._id }, { status: 201 });
    } catch (error: unknown) {
        console.error('Error in sign-up:', error);
        return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
    }
}