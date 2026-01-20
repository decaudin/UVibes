import { NextResponse } from "next/server";

const BASE_URL = "https://u-vibes.vercel.app";

const staticPages = [
    "en", "fr",
    "en/about","fr/about",
    "en/about/guides", "fr/about/guides",
    "en/check-uv", "fr/check-uv",
];

const articleSlugs = [
    "understanding-uv-index",
    "how-uv-index-is-calculated",
    "safe-sun-exposure",
    "choose-sunscreen",
    "uv-long-term-effects",
    "vitamin-d-and-sunlight",
    "sun-protection-in-winter",
    "year-round-high-uv-zones",
];

export async function GET() {
    const urls: string[] = [];

    staticPages.forEach(path => urls.push( `${BASE_URL}/${path}`));

    articleSlugs.forEach(slug => {
        urls.push(`${BASE_URL}/en/about/guides/${slug}`);
        urls.push(`${BASE_URL}/fr/about/guides/${slug}`);
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${urls.map(loc => `<url><loc>${loc}</loc></url>`).join("\n")}
        </urlset>
    `;

    return new NextResponse(sitemap, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
        },
    })
}