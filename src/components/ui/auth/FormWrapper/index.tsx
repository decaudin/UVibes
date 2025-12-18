import Link from "next/link";

interface FormWrapperProps {
    title: string;
    content?: string;
    href?: string;
    link?: string;
    className?: string;
    children: React.ReactNode;
}

export default function FormWrapper({ title, content, href, link, className, children }: FormWrapperProps) {

    return (
        <div className="flex flex-col items-center w-full xs:w-4/5 md:w-3/5 mx-auto border-2 border-gray-400 my-12 py-12 rounded-lg shadow-md">
            <h1 className={`text-4xl text-center mb-6 font-bold ${className}`}>{title}</h1>
            <p className="mb-8 text-center">
                {content}
                {href && link && (<Link className="text-red-500 hover:text-red-700" href={href}>{link}</Link>)}
            </p>
            {children}
        </div>
    )
}