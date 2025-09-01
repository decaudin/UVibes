type GuideTitleProps = {
    children: React.ReactNode;
};

export default function GuideTitle({ children }: GuideTitleProps) {
    return <h1 className="text-3xl font-extrabold mb-10 text-center text-sky-700 drop-shadow-lg">{children}</h1>;
}