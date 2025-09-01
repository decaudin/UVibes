import StaggeredFadeIn from "@/components/ui/animations/StaggeredFadeIn";

type SimpleGuideSectionProps = {
    title: string;
    content: string;
};

export default function SimpleGuideSection({ title, content }: SimpleGuideSectionProps) {
    return (
        <StaggeredFadeIn as="section" className="mb-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-3 text-sky-700">{title}</h2>
            <p className="leading-relaxed text-gray-800">{content}</p>
        </StaggeredFadeIn>
    )
}