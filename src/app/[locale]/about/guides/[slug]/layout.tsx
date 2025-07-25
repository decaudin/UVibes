import Link from "next/link";
import { getI18n } from "@/locales/server";

export default async function ArticleLayout({ children, params }: { children: React.ReactNode, params: { locale: string } }) {
    const t = await getI18n();

    return (
        <div className="max-w-3xl mx-auto py-10">
            <article className="px-8 py-10 text-justify">
                {children}
            </article>
            <Link href={`/${params.locale}/about/guides`} className="flex justify-center my-4 text-blue-600 hover:underline">
                ← {t("aboutBackLink")}
            </Link>
        </div>
    )
}