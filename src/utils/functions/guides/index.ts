import path from "path";
import fs from "fs";
import type { JSX } from "react";

const guidesDir = path.resolve(process.cwd(), "src/content/guides");

export const getArticleComponents = (): Record<string, () => Promise<{ default: () => Promise<JSX.Element> }>> => {
  
    const components: Record<string, () => Promise<{ default: () => Promise<JSX.Element> }>> = {};

    const files = fs.readdirSync(guidesDir).filter((f) => f.endsWith(".tsx"));

    for (const file of files) {
        const slug = file.replace(".tsx", "");
        components[slug] = async () => import(`@/content/guides/${file}`);
    }

    return components
}