import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { getI18n } from "@/locales/server";
import ContactForm from "@/components/features/contact";

export const metadata: Metadata = generateMetadata({
    title: "Contact Us",
    description: "Got questions, suggestions, or feedback? Reach out to us easily here and we'll get back to you.",
    keywords: ["contact", "feedback", "questions", "suggestions", "support", "UVibes"],
    url: "https://u-vibes.vercel.app/contact"
});

export default async function Contact() {

    const t = await getI18n();

    return (
        <div className="flex flex-col w-full">
            <h1 className="text-center my-16 text-lg">{t("contactTitle")}</h1>
            <ContactForm />
        </div>
    )
}