import { JSX } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const articleComponents: Record<string, () => Promise<{ default: () => Promise<JSX.Element>; generateMetadata?: (params: { params: { slug: string; locale: string } }) => Promise<Metadata> }>> = {
    "understanding-uv-index": () => import("@/content/guides/understanding-uv-index"),
    "how-uv-index-is-calculated": () => import("@/content/guides/how-uv-index-is-calculated"),
    "safe-sun-exposure": () => import("@/content/guides/safe-sun-exposure"),
    "choose-sunscreen": () => import("@/content/guides/choose-sunscreen"),
    "uv-long-term-effects": () => import("@/content/guides/uv-long-term-effects"),
    "vitamin-d-and-sunlight": () => import("@/content/guides/vitamin-d-and-sunlight"),
    "sun-protection-in-winter": () => import("@/content/guides/sun-protection-in-winter"),
    "year-round-high-uv-zones": () => import("@/content/guides/year-round-high-uv-zones"),
};

export async function generateMetadata({ params }: { params: { slug: string; locale: string } }): Promise<Metadata> {
    const importFn = articleComponents[params.slug];
    if (!importFn) return {};

    const mod = await importFn();

    if (mod.generateMetadata) return mod.generateMetadata({ params });

    return { title: params.slug } 
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {

    const { slug } = params;

    const importFn = articleComponents[slug];
    if (!importFn) return notFound();

    const mod = await importFn();
    const ArticleComponent = mod.default;
    const articleJSX = await ArticleComponent();

    return <>{articleJSX}</>
}