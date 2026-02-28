type AboutHrefProps = {
    chunks: React.ReactNode;
    href: string;
};

export default function AboutHref({ chunks, href}: AboutHrefProps) {
    return ( 
        <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
        >
            {chunks} <span className="text-sm">🔗</span>
        </a>
    )
}