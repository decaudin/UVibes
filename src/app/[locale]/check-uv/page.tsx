import { getTranslations } from "next-intl/server";
import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";
import CheckUVForm from "@/components/features/check-uv";

export async function generateMetadata() { return generateMetadataForIndexedPage("checkUv") }

export default async function CheckUV() {

    const t = await getTranslations();

    return (
        <div className="w-full my-20 ">
            <h1 className="text-4xl font-bold text-sky-700 text-center">
                {t("checkUv.title")}
            </h1>
            <p className="text-center my-10">
                {t("checkUv.subtitle")}
            </p>
            <CheckUVForm />
        </div>
    )
}