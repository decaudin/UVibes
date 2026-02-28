import type { LocaleLayoutProps } from "@/types/localeLayoutProps";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function ArticleLayout({ children, params }: LocaleLayoutProps) {

    const { locale } = await params;
    
    const t = await getTranslations();

    return (
        <div className="max-w-3xl mx-auto py-10">
            {children}
            <Link href={`/${locale}/about/guides`} className="flex justify-center my-4 text-blue-600 dark:text-blue-400 hover:underline hover:font-bold">
                ← {t("about.backLink")}
            </Link>
        </div>
    )
}