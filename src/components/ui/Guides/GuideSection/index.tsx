import StaggeredFadeIn from "@/components/ui/animations/StaggeredFadeIn";

type GuideSectionProps = {
    title: string;
    children: React.ReactNode;
};

export default function GuideSection({ title, children }: GuideSectionProps) {
    return (
        <StaggeredFadeIn as="section" className="mb-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-3 text-sky-700">{title}</h2>
            <div className="space-y-2 text-gray-800">{children}</div>
        </StaggeredFadeIn>
    )
}