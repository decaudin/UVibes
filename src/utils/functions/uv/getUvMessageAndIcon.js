import Image from "next/image";

const renderImage = (src, alt, className) => {
    return <Image src={src} alt={alt} className={className} width={100} height={100} />;
};

export const getUvMessageAndIcon = (uvLevel) => {
    if (uvLevel >= 9) {
        return {
            message: "⚠️ Extreme UV level, stay indoors if possible. ⚠️",
            image: renderImage("/uv-9.webp", "Extreme UV", " border-solid border-4 border-red-500"),
        };
    } else if (uvLevel >= 7) {
        return {
            message: "⚠️ Very high UV level, avoid being outside for long. ⚠️",
            image: renderImage("/uv-7-9.webp", "Very High UV", "border-yellow-500"),
        };
    } else if (uvLevel >= 5) {
        return {
            message: "🔶 High UV level, wear sunscreen and protective gear. 🔶",
            image: renderImage("/uv-7-9.jpg", "High UV", "border-orange-500"),
        };
    } else if (uvLevel >= 3) {
        return {
            message: "🟡 Moderate UV level, take precautions.🟡",
            image: renderImage("/uv-3-5.jpg", "Moderate UV", "border-yellow-300"),
        };
    } else {
        return {
            message: "✅ Low UV level, safe to be outside. ✅",
            image: renderImage("/uv-0-3.jpg", "Low UV", "border-gray-300"),
        };
    }
}

// CODE TYPESCRIPT NON FONCTIONNEL

// import { ReactElement }  from "react";
// import Image from "next/image";

// const renderImage = (src: string, alt: string, className?: string): ReactElement => {
//     return <Image src={src} alt={alt} className={className || ""} width={40} height={40} />;
// };

// export const getUvMessageAndIcon = (uvLevel: number): { message: string; image: ReactElement } => {
//     if (uvLevel >= 9) {
//         return {
//         message: "Extreme UV level, stay indoors if possible.",
//         image: renderImage("/", "Extreme UV", "border-red-500"),
//         };
//     } else if (uvLevel >= 7) {
//         return {
//         message: "Very high UV level, avoid being outside for long.",
//         image: renderImage("/images/very-high-uv.png", "Very High UV", "border-yellow-500"),
//         };
//     } else if (uvLevel >= 5) {
//         return {
//         message: "High UV level, wear sunscreen and protective gear.",
//         image: renderImage("/images/high-uv.png", "High UV", "border-orange-500"),
//         };
//     } else if (uvLevel >= 3) {
//         return {
//         message: "Moderate UV level, take precautions.",
//         image: renderImage("/hat-glaces.jpg", "Moderate UV", "border-yellow-300"),
//         };
//     } else {
//         return {
//         message: "Low UV level, safe to be outside.",
//         image: renderImage("/images/low-uv.png", "Low UV", "border-gray-300"),
//         };
//     }
// };