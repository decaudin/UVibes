type MetadataInput = {
    title: string;
    description: string;
    keywords?: string[];
    url?: string;
    robots?: string;
}

export function generateMetadata({ title, description, keywords, url, robots }: MetadataInput) {
    const fullTitle = `${title} | UVibes - UV Index and Sun Exposure Calculator`
    return {
        title: fullTitle,
        description,
        keywords,
        ...(robots && { robots }),
        openGraph: {
            title: fullTitle,
            description,
            ...(url && { url }),
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
        },
    }
}