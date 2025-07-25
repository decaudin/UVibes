// import type { Props } from "@/types/pageProps";
// import { JSX } from "react";
// import Link from "next/link";
// import { setStaticParamsLocale } from "next-international/server";
// import { getI18n } from "@/locales/server";
// import { generateMetadataForNonIndexedPage } from "@/lib/metadata/nonIndexed";

// export const generateMetadata = async ({ params }: Props) => {
//     setStaticParamsLocale(params.locale);
//     return await generateMetadataForNonIndexedPage("notFound");
// };

// export default async function NotFound({ params } : Props): Promise<JSX.Element>  {

//     const t = await getI18n()

//     return (
//         <div className="text-center mb-20">
//             <h1 className="text-[150px] text-sky-500 xxs:text-[200px]">{t("404")}</h1>
//             <p className="text-6xl">{t("oups")}</p>
//             <p className="text-2xl mt-12 mb-16">{t("notFoundText")}</p>
//             <Link href={`/${params.locale}`} className="border border-gray-400 text-black px-8 py-3 bg-gray-200 rounded-xl shadow hover:bg-gray-300">{t("notFoundLink")}</Link>
//         </div>
//     )
// }

import { JSX } from "react";
import Link from "next/link";
import { getI18n } from "@/locales/server";
import { generateMetadataForNonIndexedPage } from "@/lib/metadata/nonIndexed";

export const generateMetadata = async () => {
    return await generateMetadataForNonIndexedPage("notFound");
};

export default async function NotFound(): Promise<JSX.Element>  {

    const t = await getI18n()

    return (
        <div className="text-center mb-20">
            <h1 className="text-[150px] text-sky-500 xxs:text-[200px]">{t("404")}</h1>
            <p className="text-6xl">{t("oups")}</p>
            <p className="text-2xl mt-12 mb-16">{t("notFoundText")}</p>
            <Link href="/" className="border border-gray-400 text-black px-8 py-3 bg-gray-200 rounded-xl shadow hover:bg-gray-300">{t("notFoundLink")}</Link>
        </div>
    )
}