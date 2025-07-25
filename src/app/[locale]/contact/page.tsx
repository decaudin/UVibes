import type { Props } from "@/types/pageProps";
import { setStaticParamsLocale } from "next-international/server";
import { getI18n } from "@/locales/server";
import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";
import ContactForm from "@/components/features/contact";

export const generateMetadata = async ({ params }: Props) => {
    setStaticParamsLocale(params.locale);
    return await generateMetadataForIndexedPage("contact");
};

export default async function Contact() {

    const t = await getI18n();

    return (
        <div className="flex flex-col w-full">
            <h1 className="text-center my-16 text-lg">{t("contactTitle")}</h1>
            <ContactForm />
        </div>
    )
}