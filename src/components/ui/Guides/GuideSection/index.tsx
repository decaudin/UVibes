type GuideSectionProps = {
    title: string;
    children: React.ReactNode;
};

export default function GuideSection({ title, children }: GuideSectionProps) {
    return (
        <section className="mb-10">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <div>{children}</div>
        </section>
    )
}