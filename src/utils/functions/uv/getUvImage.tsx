import Image from "next/image";

const renderImage = (src: string, alt: string, extraClass: string) => {
    return <Image src={src} alt={alt} className={`border-solid border-4 ${extraClass}`} width={100} height={100} />;
};

export const getUvImage = (uvLevel: number) => {
    if (uvLevel >= 9) {
        return renderImage("/uv-index/uv-9.webp", "Extreme UV", "border-red-500");
    } else if (uvLevel >= 7) {
        return renderImage("/uv-index/uv-7-9.webp", "Very High UV", "border-yellow-500");
    } else if (uvLevel >= 5) {
        return renderImage("/uv-index/uv-5-7.jpg", "High UV", "border-orange-500");
    } else if (uvLevel >= 3) {
        return renderImage("/uv-index/uv-3-5.jpg", "Moderate UV", "border-yellow-300");
    } else {
        return renderImage("/uv-index/uv-0-3.jpg", "Low UV", "border-gray-100");
    }
}