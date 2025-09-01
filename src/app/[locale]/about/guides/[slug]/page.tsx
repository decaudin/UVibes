import { notFound } from "next/navigation";
import { generateMetadataForIndexedPage } from "@/lib/metadata/indexed";
import { getSeoKeyFromSlug } from "@/lib/metadata/getSeoKey";
import { getArticleComponents } from "@/utils/functions/guides";
import StaggeredFadeIn from "@/components/ui/animations/StaggeredFadeIn";

type ArticleParams = { params: Promise<{ slug: string; locale: "en" | "fr" }> };

export async function generateMetadata({ params }: ArticleParams) {

    const { slug } = await params;
    const seoKey = getSeoKeyFromSlug(slug);

    if (!seoKey) return {};
    return generateMetadataForIndexedPage(seoKey); 
}

export default async function ArticlePage({ params }: ArticleParams) {
    
    const { slug } = await params;

    const articleComponents = getArticleComponents();
    const importFn = articleComponents[slug];

    if (!importFn) return notFound();

    const mod = await importFn();
    const ArticleComponent = mod.default;
    const articleJSX = await ArticleComponent();

    return <StaggeredFadeIn as="article" className="px-8 py-10 text-justify">{articleJSX}</StaggeredFadeIn>;
}