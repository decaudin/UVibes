import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import ContactForm from "@/components/features/contact";

export const metadata: Metadata = generateMetadata({
    title: "Contact Us",
    description: "Got questions, suggestions, or feedback? Reach out to us easily here and we'll get back to you.",
    keywords: ["contact", "feedback", "questions", "suggestions", "support", "UVibes"],
    url: "https://u-vibes.vercel.app/contact"
});

export default function Contact() {

    return (
        <div className="flex flex-col w-full">
            <h1 className="text-center my-16 text-lg">Got questions, suggestions, or feedback? Contact us easily here!</h1>
            <ContactForm />
        </div>
    )
}