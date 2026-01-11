import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getTranslationKeyFromSlug } from "@/utils/functions/slug";

type GuideCardProps = {
    slug: string;
    image: string;
    locale: string;
};

export default async function GuideCard({ slug, image, locale }: GuideCardProps) {

    const t = await getTranslations();
    const key = getTranslationKeyFromSlug(slug);

    if (!key) return notFound();

    const title = t(`card.${key}.title` as const);
    const description = t(`card.${key}.description` as const);

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
            <Image src={image} alt={title} width={249} height={100} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h2 className="text-xl text-black font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 text-sm mb-4">{description}</p>
                <Link
                    href={`/${locale}/about/guides/${slug}`}
                    className="inline-block text-blue-600 hover:font-bold hover:underline font-medium cursor-pointer"
                >
                    {t("card.link")}→
                </Link>
            </div>
        </div>
    )
}