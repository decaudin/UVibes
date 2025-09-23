import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { generateMetadataForNonIndexedPage } from "@/lib/metadata/nonIndexed";

export const generateMetadata = async () => { return generateMetadataForNonIndexedPage("notFound") };

export default async function NotFound() {

    const locale = await getLocale();
    
    const t = await getTranslations();

    return (
        <div className="text-center mb-16">
            <h1 className="text-[150px] text-sky-500 xxs:text-[200px]">{t("404")}</h1>
            <p className="text-6xl">{t("oups")}</p>
            <p className="text-2xl mt-12 mb-16">{t("notFoundText")}</p>
            <Link href={`/${locale}/`} className="border border-gray-400 text-black px-8 py-3 bg-gray-200 rounded-xl shadow hover:bg-gray-300">{t("notFoundLink")}</Link>
        </div>
    )
}