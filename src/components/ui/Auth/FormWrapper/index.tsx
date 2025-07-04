import Link from "next/link";

interface FormWrapperProps {
    title: string;
    content: string;
    href: string;
    link: string;
    children: React.ReactNode;
}

export default function FormWrapper({ title, content, href, link, children }: FormWrapperProps) {

    return (
        <div className="flex flex-col items-center w-full xs:w-3/5 mx-auto border-2 border-gray-400 my-12 rounded-lg shadow-md">
            <h1 className="text-4xl mt-12 mb-6 font-bold">{title}</h1>
            <p className="mb-8 text-center">{content}<Link className="text-red-500" href={href}>{link}</Link></p>
            {children}
        </div>
    );
}