import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { escapeHtml } from '@/lib/escapeHtml';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    
    const { firstName, lastName, email, message } = await req.json();

    if (!firstName || !lastName || !email || !message) return NextResponse.json({ code: 'MISSING_FIELDS' }, { status: 400 });

    const toEmail = process.env.CONTACT_RECEIVER_EMAIL;

    if (!toEmail) return NextResponse.json({ code: 'RECEIVER_EMAIL_NOT_CONFIGURED' }, { status: 500 });

    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    try {
        const data = await resend.emails.send({
            from: 'U-Vibes Contact <onboarding@resend.dev>',
            to: toEmail,
            subject: 'Nouveau message de contact',
            html: `
                <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 650px; margin: auto; background-color: #fff8f3; border-radius: 10px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.08);">
                    <div style="background: linear-gradient(90deg, #ff6a00, #ee0979); color: white; padding: 24px 20px; text-align: center;">
                        <img src="https://u-vibes.vercel.app/favicon.ico" alt="U-Vibes logo" style="max-height: 50px; margin-bottom: 10px;" />
                        <h2 style="margin: 0; font-size: 24px;"><span style="margin-right: 8px;">📬</span> Nouveau message reçu via le formulaire UVibes</h2>
                    </div>

                    <div style="padding: 24px;">
                        <h3 style="margin-top: 0; color: #ff6a00;"><span style="margin-right: 6px;">👤</span> Informations du contact :</h3>
                        <p style="margin: 8px 0;"><strong>Prénom :</strong> ${safeFirstName}</p>
                        <p style="margin: 8px 0;"><strong>Nom :</strong> ${safeLastName}</p>
                        <p style="margin: 8px 0;"><strong>Email :</strong> <a href="mailto:${safeEmail}" style="color: #ee0979; text-decoration: none;">${safeEmail}</a></p>
                    </div>

                    <div style="padding: 24px; background-color: #fff3ea; border-left: 5px solid #ff6a00; border-radius: 0 10px 10px 0;">
                        <h3 style="margin-top: 0; color: #d84315;"><span style="margin-right: 6px;">💬</span> Message :</h3>
                        <p style="white-space: pre-wrap; font-size: 16px; color: #333; line-height: 1.6;">${safeMessage}</p>
                    </div>

                    <div style="text-align: center; margin: 30px 0;">
                        <a href="mailto:${safeEmail}" style="display: inline-block; background: #ee0979; color: white; text-decoration: none; padding: 12px 24px; border-radius: 30px; font-weight: bold; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                            <span style="margin-right: 6px;">✉️</span> Répondre à ${safeFirstName}
                        </a>
                    </div>

                    <div style="text-align: center; padding: 16px; background-color: #fbe9e7; color: #6d4c41; font-size: 13px;">
                        Message reçu le <strong>${new Date().toLocaleDateString("fr-FR", { timeZone: "Europe/Paris" })}</strong>
                        à <strong>${new Date().toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris" })}</strong>
                    </div>
                </div>
            `
        });

        if (data.error) {
            console.error('Resend error:', data.error);
            return NextResponse.json({ code: 'FAILED_TO_SEND_EMAIL' }, { status: 500 });
        }

        console.log('[CONTACT_EMAIL_SENT]', { id: data.data?.id ?? null, timestamp: new Date().toISOString() });

        return NextResponse.json({ code: 'MESSAGE_SENT_SUCCESSFULLY' }, { status: 200 });

    } catch (err) {
        console.error('Unexpected error while sending email:', err);
        return NextResponse.json({ code: 'UNEXPECTED_ERROR' }, { status: 500 });
    }
}