import type { Metadata } from "next";

type MetadataProps = {
    title: string;
    suffix: string;
    description: string;
    keywords?: string[];
    robots?: string;
    type?: "website" | "article";
    url?: string;
}

export const createMetadata = ({ title, suffix, description, keywords, robots, type, url }: MetadataProps): Metadata => {
    const fullTitle = `${title} | UVibes - ${suffix}`
    return {
        title: fullTitle,
        description,
        keywords,
        ...(robots && { robots }),
        openGraph: {
            title: fullTitle,
            description,
            ...(type && { type }),
            ...(url && { url }),
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
        },
    }
}