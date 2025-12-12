import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetPasswordEmail(to: string, link: string, name: string, locale: "fr" | "en") {

    if (!resend) return NextResponse.json({ code: 'RESEND_KEY_NOT_CONFIGURED' }, { status: 500 })

    const t = locale === "fr" ? await import("@/locales/fr/resetPassword.json") : await import("@/locales/en/resetPassword.json");

    const html = `
        <div style="padding: 20px 0; background-color: #f5f5f5; font-family: Arial, sans-serif;">

            <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 650px; margin: auto;">
                <tr>
                    <td style="padding: 10px 0; text-align: center;">
                        <img src="https://u-vibes.vercel.app/favicon.ico" alt="UVibes Logo" width="40" height="40" style="vertical-align: middle;">
                        <span style="font-size: 24px; font-weight: bold; vertical-align: middle; margin-left: 10px;">UVibes</span>
                    </td>
                </tr>
            </table>

            <table width="650" cellspacing="0" cellpadding="0" style="max-width: 650px; margin: 20px auto; padding: 30px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <tr>
                    <td>
                        <h2 style="margin-top: 0; text-align: center; font-size: 20px; color: #111;">${t.emailSubject}</h2>

                        <p style="font-size: 16px; line-height: 1.6; color: #111;">${t.greeting}, ${name}</p>
                        <p style="font-size: 16px; line-height: 1.6; color: #111;">${t.instructions}</p>

                        <p style=" margin: 30px 0; text-align: center;">
                            <a
                                href="${link}"
                                style="
                                    display: inline-block;
                                    padding: 12px 25px;
                                    min-width: 150px;
                                    background-color: #0070f3;
                                    color: #fff;
                                    text-decoration: none;
                                    border-radius: 6px;
                                    font-weight: bold;
                                "
                            >
                                ${t.buttonText}
                            </a>
                        </p>

                        <p style="font-size: 14px; line-height: 1.6; color: #111;">${t.linkText}</p>
                        <p style="word-break: break-all;"><a href="${link}" style="color: #0070f3;">${link}</a></p>

                        <p style=" margin-top: 20px; text-align: center; font-size: 12px; color: #555;">${t.securityNote}</p>
                        <p style="margin-top: 4px; text-align: center; font-size: 12px; color: #555;">${t.ignoreNote}</p>
                        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
                        <p style="margin-bottom: 0; text-align: center; font-size: 12px; color: #888;">${t.supportNote}</p>
                    </td>
                </tr>
            </table>

            <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 650px; margin: auto; text-align: center; font-size: 12px; line-height: 1; color: #888;">
                <tr>
                    <td style="padding: 10px 0;">© ${new Date().getFullYear()} UVibes. All rights reserved.</td>
                </tr>
            </table>

        </div>
    `;

    await resend.emails.send({ from: "UVibes - No Reply <onboarding@resend.dev>", to, subject: t.emailSubject, html })
}