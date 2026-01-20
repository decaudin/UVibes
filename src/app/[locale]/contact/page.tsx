import { getTranslations } from "next-intl/server";
import { generateMetadataForNonIndexedPage } from "@/lib/metadata/nonIndexed";
import ContactForm from "@/components/features/contact";

export async function generateMetadata() { return generateMetadataForNonIndexedPage("contact") }

export default async function Contact() {

    const t = await getTranslations();

    return (
        <div className="flex flex-col w-full">
            <h1 className="text-center my-16 text-lg">{t("contactTitle")}</h1>
            <ContactForm />
        </div>
    )
}