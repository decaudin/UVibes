import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {

    const { firstName, lastName, email, message } = await req.json();

    if (!firstName || !lastName || !email || !message) {
        return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.sfr.fr',
            port: 465,
            secure: true,
            auth: {
                user: process.env.NEUF_USER,
                pass: process.env.NEUF_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.NEUF_USER,
            // replyTo: email,
            to: process.env.NEUF_USER,
            subject: 'Nouveau message de contact',
            text: `
                Nouveau message de contact :

                Prénom: ${firstName}
                Nom: ${lastName}
                E-mail: ${email}

                Message:
                ${message}
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: 'Message sent successfully!' }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error sending email:', error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        } else {
            console.error('Unexpected error:', error);
            return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), { status: 500 });
        }    
    }
}