type SimpleGuideSectionProps = {
    title: string;
    content: string;
};

export default function SimpleGuideSection({ title, content }: SimpleGuideSectionProps) {

    return (
        <section className="mb-10">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p>{content}</p>
        </section>
    )
}