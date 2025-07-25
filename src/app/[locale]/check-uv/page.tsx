import type { Props } from "@/types/pageProps";
import { setStaticParamsLocale } from "next-international/server";
import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";
import { getI18n } from "@/locales/server";
import CheckUVForm from "@/components/features/check-uv";

export const generateMetadata = async ({ params }: Props) => {
    setStaticParamsLocale(params.locale);
    return await generateMetadataForIndexedPage("checkUv");
};

export default async function CheckUV() {

    const t = await getI18n();

    return (
        <div className="w-full my-20 ">
            <h1 className="text-4xl font-bold text-sky-700 text-center">
                {t("checkUv.title")}
            </h1>
            <p className="text-center text-gray-600 my-10">
                {t("checkUv.subtitle")}
            </p>
            <CheckUVForm />
        </div>
    )
}